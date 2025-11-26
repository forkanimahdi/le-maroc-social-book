<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SendNewsletterJob;
use App\Models\Newsletter;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index()
    {
        $subscribers = Subscriber::orderBy('created_at', 'desc')->get();
        $newsletters = Newsletter::orderBy('sent_at', 'desc')->get();

        return Inertia::render('admin/newsletter', [
            'subscribers' => $subscribers,
            'newsletters' => $newsletters,
            'subscriberStats' => [
                'active' => $subscribers->whereNull('unsubscribed_at')->count(),
                'inactive' => $subscribers->whereNotNull('unsubscribed_at')->count(),
                'total' => $subscribers->count(),
            ],
        ]);
    }

    public function send(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $subscribers = Subscriber::whereNull('unsubscribed_at')->get();
        $recipientsCount = $subscribers->count();

        $newsletter = Newsletter::create([
            'subject' => $request->subject,
            'content' => $request->content,
            'sent_at' => now(),
            'recipients_count' => $recipientsCount,
            'open_rate' => 0,
            'click_rate' => 0,
        ]);

        foreach ($subscribers as $subscriber) {
            SendNewsletterJob::dispatch($newsletter, $subscriber);
        }

        return redirect()->back()->with('success', 'Newsletter programmée pour ' . $recipientsCount . ' abonné·e·s.');
    }

    public function exportSubscribers()
    {
        $subscribers = Subscriber::orderBy('created_at', 'desc')->get();

        $data = [
            ['Nom', 'Email', 'Date d\'inscription', 'Statut']
        ];

        foreach ($subscribers as $subscriber) {
            $data[] = [
                $subscriber->nom,
                $subscriber->email,
                $subscriber->created_at->format('Y-m-d H:i:s'),
                $subscriber->unsubscribed_at ? 'Désinscrit' : 'Actif',
            ];
        }

        $filename = 'subscribers-' . date('Y-m-d') . '.csv';

        $callback = function() use ($data) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
            foreach ($data as $row) {
                fputcsv($file, $row, ';');
            }
            fclose($file);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    public function toggleSubscriberStatus(Subscriber $subscriber)
    {
        if ($subscriber->unsubscribed_at) {
            $subscriber->update(['unsubscribed_at' => null]);
            return back()->with('success', 'Abonné réactivé.');
        }

        $subscriber->update(['unsubscribed_at' => now()]);
        return back()->with('success', 'Abonné désinscrit.');
    }
}

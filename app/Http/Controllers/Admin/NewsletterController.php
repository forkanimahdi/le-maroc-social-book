<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index()
    {
        // Get subscribers from database
        $subscribers = \App\Models\Subscriber::orderBy('created_at', 'desc')->get();
        
        // Get newsletter history
        $newsletters = \App\Models\Newsletter::orderBy('sent_at', 'desc')->get();
        
        return Inertia::render('admin/newsletter', [
            'subscribers' => $subscribers,
            'newsletters' => $newsletters
        ]);
    }
    
    public function send(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        
        // Get all subscribers (no status filter since column doesn't exist)
        $subscribers = \App\Models\Subscriber::all();
        $recipientsCount = $subscribers->count();
        
        // Create newsletter record with sent_at set to now (when jobs are dispatched)
        $newsletter = \App\Models\Newsletter::create([
            'subject' => $request->subject,
            'content' => $request->content,
            'sent_at' => now(), // Set when jobs are dispatched
            'recipients_count' => $recipientsCount,
            'open_rate' => 0,
            'click_rate' => 0,
        ]);
        
        // Dispatch jobs to send newsletter to each subscriber
        foreach ($subscribers as $subscriber) {
            \App\Jobs\SendNewsletterJob::dispatch($newsletter, $subscriber);
        }
        
        return redirect()->back()->with('success', 'Newsletter programmée pour envoi à ' . $recipientsCount . ' abonnés. Les e-mails seront envoyés progressivement.');
    }
    
    public function exportSubscribers()
    {
        $subscribers = \App\Models\Subscriber::all();
        
        $data = [
            ['Nom', 'Email', 'Date d\'inscription', 'Statut']
        ];
        
        foreach ($subscribers as $subscriber) {
            $data[] = [
                $subscriber->nom,
                $subscriber->email,
                $subscriber->created_at->format('Y-m-d H:i:s'),
                'Actif' // All subscribers are considered active
            ];
        }
        
        $filename = 'subscribers-' . date('Y-m-d') . '.csv';
        
        $callback = function() use ($data) {
            $file = fopen('php://output', 'w');
            // Add BOM for Excel UTF-8 support
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
}

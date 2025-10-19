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
        
        // Create newsletter record
        $newsletter = \App\Models\Newsletter::create([
            'subject' => $request->subject,
            'content' => $request->content,
            'sent_at' => now(),
            'recipients_count' => \App\Models\Subscriber::where('status', 'active')->count(),
            'open_rate' => 0,
            'click_rate' => 0,
        ]);
        
        // Simulate sending (in real app, integrate with email service)
        $subscribers = \App\Models\Subscriber::where('status', 'active')->get();
        
        foreach ($subscribers as $subscriber) {
            // Here you would send actual emails
            // Mail::to($subscriber->email)->send(new NewsletterMail($newsletter));
        }
        
        return redirect()->back()->with('success', 'Newsletter envoyée avec succès !');
    }
    
    public function exportSubscribers()
    {
        $subscribers = \App\Models\Subscriber::all();
        
        $csvData = [
            ['Nom', 'Email', 'Date d\'inscription', 'Statut']
        ];
        
        foreach ($subscribers as $subscriber) {
            $csvData[] = [
                $subscriber->name,
                $subscriber->email,
                $subscriber->created_at->format('Y-m-d'),
                $subscriber->status
            ];
        }
        
        $filename = 'subscribers-' . date('Y-m-d') . '.csv';
        
        $callback = function() use ($csvData) {
            $file = fopen('php://output', 'w');
            foreach ($csvData as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        };
        
        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}

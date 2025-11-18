<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Mail\IdeaApprovalMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class IdeaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'text' => ['required', 'string'],
            'agree' => ['required', 'boolean'],
        ]);
        $idea = Idea::create($validated);
        return back()->with('success', 'Idée soumise.');
    }

    public function update(Request $request, Idea $idea)
    {
        $validated = $request->validate([
            'full_name' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'text' => ['nullable', 'string'],
        ]);
        
        $idea->update(array_filter($validated));
        
        return back()->with('success', 'Idée mise à jour avec succès.');
    }

    public function moderate(Idea $idea)
    {
        $idea->update(['status' => 'approved']);
        
        // Send approval email if email is provided
        if ($idea->email) {
            try {
                Mail::to($idea->email)->send(new IdeaApprovalMail($idea));
                Log::info('Idea approval email sent to: ' . $idea->email);
            } catch (\Exception $e) {
                Log::error('Failed to send idea approval email to ' . $idea->email . ': ' . $e->getMessage());
                Log::error('Exception trace: ' . $e->getTraceAsString());
            }
        }
        
        return back()->with('success', 'Idée approuvée avec succès.');
    }

    public function reject(Idea $idea)
    {
        $idea->update(['status' => 'rejected']);
        return back()->with('success', 'Idée rejetée.');
    }
}



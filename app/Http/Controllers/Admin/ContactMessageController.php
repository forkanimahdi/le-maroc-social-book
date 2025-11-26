<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplyMail;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/messages', [
            'messages' => $messages,
            'stats' => [
                'total' => $messages->count(),
                'pending' => $messages->where('status', 'pending')->count(),
                'replied' => $messages->where('status', 'replied')->count(),
            ],
        ]);
    }

    public function reply(Request $request, ContactMessage $message)
    {
        $validated = $request->validate([
            'reply' => ['required', 'string'],
        ]);

        $message->update([
            'reply' => $validated['reply'],
            'status' => 'replied',
            'replied_at' => now(),
        ]);

        Mail::to($message->email)->send(new ContactReplyMail($message));

        return back()->with('success', 'Réponse envoyée avec succès.');
    }
}



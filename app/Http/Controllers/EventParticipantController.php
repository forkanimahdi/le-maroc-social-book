<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventParticipantRequest;
use App\Mail\EventRegistrationMail;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EventParticipantController extends Controller
{
    public function store(EventParticipantRequest $request)
    {
        $validated = $request->validated();
        
        // Create participant
        $participant = EventParticipant::create([
            'full_name' => $validated['full_name'],
            'role' => $validated['role'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'status' => 'pending',
        ]);

        // Send registration confirmation email
        try {
            Mail::to($participant->email)->send(new EventRegistrationMail($participant));
        } catch (\Exception $e) {
            Log::error('Failed to send event registration email: ' . $e->getMessage());
        }

        return back()->with('success', 'Votre demande d\'inscription a été enregistrée avec succès.');
    }
}


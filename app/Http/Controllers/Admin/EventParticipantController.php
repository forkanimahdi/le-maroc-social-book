<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\EventApprovalMail;
use App\Mail\EventRejectionMail;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class EventParticipantController extends Controller
{
    public function index(Request $request)
    {
        // Get all participants - filtering will be done on frontend
        $participants = EventParticipant::orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/event-participants', [
            'participants' => $participants,
            'stats' => [
                'total' => $participants->count(),
                'pending' => $participants->where('status', 'pending')->count(),
                'approved' => $participants->where('status', 'approved')->count(),
                'rejected' => $participants->where('status', 'rejected')->count(),
            ],
        ]);
    }

    public function approve(Request $request, $id)
    {
        $participant = EventParticipant::findOrFail($id);

        if ($participant->status !== 'pending') {
            return back()->with('error', 'Cette demande a déjà été traitée.');
        }

        // Update participant
        $participant->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);

        // Send approval email
        try {
            Mail::to($participant->email)->send(new EventApprovalMail($participant));
        } catch (\Exception $e) {
            Log::error('Failed to send approval email: ' . $e->getMessage());
        }

        return back()->with('success', 'Participant approuvé avec succès.');
    }

    public function reject(Request $request, $id)
    {
        $participant = EventParticipant::findOrFail($id);

        if ($participant->status !== 'pending') {
            return back()->with('error', 'Cette demande a déjà été traitée.');
        }

        // Update participant
        $participant->update([
            'status' => 'rejected',
            'rejected_at' => now(),
        ]);

        // Send rejection email
        try {
            Mail::to($participant->email)->send(new EventRejectionMail($participant));
        } catch (\Exception $e) {
            Log::error('Failed to send rejection email: ' . $e->getMessage());
        }

        return back()->with('success', 'Participant rejeté.');
    }
}


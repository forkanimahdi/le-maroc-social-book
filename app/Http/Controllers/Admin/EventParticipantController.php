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
        $query = EventParticipant::query();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $participants = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return Inertia::render('admin/event-participants', [
            'participants' => $participants,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
            ],
            'stats' => [
                'total' => EventParticipant::count(),
                'pending' => EventParticipant::where('status', 'pending')->count(),
                'approved' => EventParticipant::where('status', 'approved')->count(),
                'rejected' => EventParticipant::where('status', 'rejected')->count(),
            ],
        ]);
    }

    public function approve(Request $request, $id)
    {
        $participant = EventParticipant::findOrFail($id);

        if ($participant->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cette demande a déjà été traitée.',
            ], 400);
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

        return response()->json([
            'success' => true,
            'message' => 'Participant approuvé avec succès.',
        ]);
    }

    public function reject(Request $request, $id)
    {
        $participant = EventParticipant::findOrFail($id);

        if ($participant->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cette demande a déjà été traitée.',
            ], 400);
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

        return response()->json([
            'success' => true,
            'message' => 'Participant rejeté.',
        ]);
    }
}


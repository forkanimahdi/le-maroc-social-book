<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\SendParticipantCommunicationJob;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunicationController extends Controller
{
    public function index()
    {
        $participants = EventParticipant::where('status', 'approved')
            ->orderBy('full_name')
            ->get(['id', 'full_name', 'email', 'role']);

        return Inertia::render('admin/communication', [
            'participants' => $participants,
        ]);
    }

    public function send(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
            'participant_ids' => 'required|array|min:1',
        ]);

        $participantIds = $request->participant_ids;
        $subject = $request->subject;
        $content = $request->content;

        // If "all" is selected, get all approved participants
        if (in_array('all', $participantIds)) {
            $participants = EventParticipant::where('status', 'approved')->get();
        } else {
            // Validate that all IDs exist
            $request->validate([
                'participant_ids.*' => 'exists:event_participants,id',
            ]);
            
            $participants = EventParticipant::whereIn('id', $participantIds)
                ->where('status', 'approved')
                ->get();
        }

        // Dispatch job for each participant
        foreach ($participants as $participant) {
            SendParticipantCommunicationJob::dispatch($participant, $subject, $content);
        }

        return back()->with('success', count($participants) . ' email(s) ont été mis en file d\'attente pour envoi.');
    }
}

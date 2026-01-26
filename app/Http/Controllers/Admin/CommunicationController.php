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
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png',
        ]);

        $participantIds = is_string($request->participant_ids) 
            ? json_decode($request->participant_ids, true) 
            : $request->participant_ids;
        $subject = $request->subject;
        $content = $request->content;

        // Handle file uploads
        $attachmentPaths = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('communication-attachments', 'public');
                $attachmentPaths[] = $path;
            }
        }

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
            SendParticipantCommunicationJob::dispatch($participant, $subject, $content, $attachmentPaths);
        }

        return back()->with('success', count($participants) . ' email(s) ont été mis en file d\'attente pour envoi.');
    }
}

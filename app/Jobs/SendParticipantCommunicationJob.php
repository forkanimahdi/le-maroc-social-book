<?php

namespace App\Jobs;

use App\Mail\ParticipantCommunicationMail;
use App\Models\EventParticipant;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendParticipantCommunicationJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

    public $participant;
    public $subject;
    public $content;
    public $attachmentPaths;

    /**
     * Create a new job instance.
     */
    public function __construct(EventParticipant $participant, string $subject, string $content, array $attachmentPaths = [])
    {
        $this->participant = $participant;
        $this->subject = $subject;
        $this->content = $content;
        $this->attachmentPaths = $attachmentPaths;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->participant->email)->send(
                new ParticipantCommunicationMail($this->participant, $this->subject, $this->content, $this->attachmentPaths)
            );
        } catch (\Exception $e) {
            Log::error('Failed to send communication email to ' . $this->participant->email . ': ' . $e->getMessage());
            throw $e;
        }
    }
}

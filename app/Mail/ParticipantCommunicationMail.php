<?php

namespace App\Mail;

use App\Models\EventParticipant;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ParticipantCommunicationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $participant;
    public $subject;
    public $content;
    public $attachmentPaths;

    /**
     * Create a new message instance.
     */
    public function __construct(EventParticipant $participant, string $subject, string $content, array $attachmentPaths = [])
    {
        $this->participant = $participant;
        $this->subject = $subject;
        $this->content = $content;
        $this->attachmentPaths = $attachmentPaths;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.participant-communication',
            with: [
                'participant' => $this->participant,
                'content' => $this->content,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        
        foreach ($this->attachmentPaths as $path) {
            $fullPath = Storage::disk('public')->path($path);
            
            if (file_exists($fullPath)) {
                $attachments[] = Attachment::fromStorageDisk('public', $path)
                    ->as(basename($path));
            }
        }
        
        return $attachments;
    }
}

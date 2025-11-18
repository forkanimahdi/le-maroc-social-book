<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventApprovalMail extends Mailable
{
    use Queueable, SerializesModels;

    public $participant;

    public function __construct($participant)
    {
        $this->participant = $participant;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Félicitations ! Votre inscription à l\'événement de lancement a été confirmée',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.event-approval',
            with: [
                'participant' => $this->participant,
            ],
        );
    }
}


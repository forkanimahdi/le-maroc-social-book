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
            subject: 'Votre inscription à la cérémonie de signature et de lancement de l\'ouvrage Le Maroc Social 2030 est confirmée!',
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


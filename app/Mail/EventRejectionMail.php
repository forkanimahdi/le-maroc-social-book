<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventRejectionMail extends Mailable
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
            subject: 'Concernant votre demande d\'inscription à l\'événement de lancement',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.event-rejection',
            with: [
                'participant' => $this->participant,
            ],
        );
    }
}


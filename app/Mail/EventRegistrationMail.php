<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventRegistrationMail extends Mailable
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
            subject: 'Votre inscription est bien reçue. Nous vous reviendrons !',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.event-registration',
            with: [
                'participant' => $this->participant,
            ],
        );
    }
}


<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ThinkTankRegistrationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $signup;
    public $whatsappChannelLink;

    /**
     * Create a new message instance.
     */
    public function __construct($signup, $whatsappChannelLink)
    {
        $this->signup = $signup;
        $this->whatsappChannelLink = $whatsappChannelLink;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation d\'inscription - Think Tank Le Maroc Social 2030',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.think-tank-registration',
            with: [
                'signup' => $this->signup,
                'whatsappChannelLink' => $this->whatsappChannelLink,
            ],
        );
    }
}


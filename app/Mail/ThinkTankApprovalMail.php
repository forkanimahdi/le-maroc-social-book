<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ThinkTankApprovalMail extends Mailable
{
    use Queueable, SerializesModels;

    public $signup;
    public $whatsappGroupLink;

    /**
     * Create a new message instance.
     */
    public function __construct($signup, $whatsappGroupLink)
    {
        $this->signup = $signup;
        $this->whatsappGroupLink = $whatsappGroupLink;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Félicitations ! Votre candidature au Think Tank a été approuvée',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.think-tank-approval',
            with: [
                'signup' => $this->signup,
                'whatsappGroupLink' => $this->whatsappGroupLink,
            ],
        );
    }
}


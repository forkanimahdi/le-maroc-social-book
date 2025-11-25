<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;

class ExecutiveSummaryMail extends Mailable
{
    use Queueable, SerializesModels;

    public $prenom;
    public $nom;
    public $email;
    public $version;

    /**
     * Create a new message instance.
     */
    public function __construct($prenom, $nom, $email, $version = 'français')
    {
        $this->prenom = $prenom;
        $this->nom = $nom;
        $this->email = $email;
        $this->version = $version;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Résumé Exécutif - Le Maroc Social 2030',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.executive-summary',
            with: [
                'prenom' => $this->prenom,
                'nom' => $this->nom,
                'version' => $this->version,
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
        $pdfPath = public_path('assets/Executive Summary.pdf');
        
        // If PDF doesn't exist, create a placeholder or handle gracefully
        if (!file_exists($pdfPath)) {
            // In production, you would generate or fetch the actual PDF
            return [];
        }

        return [
            Attachment::fromPath($pdfPath)
                ->as('Resume-Executif-Maroc-Social-2030-' . $this->version . '.pdf')
                ->withMime('application/pdf'),
        ];
    }
}


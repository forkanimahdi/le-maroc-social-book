<?php

namespace App\Mail;

use App\Models\Newsletter;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewsletterJobReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public Newsletter $newsletter;
    public int $recipientsCount;

    public function __construct(Newsletter $newsletter, int $recipientsCount)
    {
        $this->newsletter = $newsletter;
        $this->recipientsCount = $recipientsCount;
    }

    public function build()
    {
        return $this->subject('Newsletter programmée – Pense à lancer le worker')
            .view('emails.newsletter-job-reminder', [
                'newsletter' => $this->newsletter,
                'recipientsCount' => $this->recipientsCount,
            ]);
    }
}



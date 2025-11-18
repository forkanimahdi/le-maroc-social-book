<?php

namespace App\Mail;

use App\Models\Newsletter;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewsletterMail extends Mailable
{
    use Queueable, SerializesModels;

    public $newsletter;
    public $subscriber;

    public function __construct(Newsletter $newsletter, Subscriber $subscriber)
    {
        $this->newsletter = $newsletter;
        $this->subscriber = $subscriber;
    }

    public function build()
    {
        return $this->subject($this->newsletter->subject)
            ->view('emails.newsletter')
            ->with([
                'newsletter' => $this->newsletter,
                'subscriber' => $this->subscriber,
            ]);
    }
}


<?php

namespace App\Jobs;

use App\Models\Newsletter;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendNewsletterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $newsletter;
    public $subscriber;

    public function __construct(Newsletter $newsletter, Subscriber $subscriber)
    {
        $this->newsletter = $newsletter;
        $this->subscriber = $subscriber;
    }

    public function handle(): void
    {
        try {
            // Send newsletter email using Mailable
            Mail::to($this->subscriber->email)->send(
                new \App\Mail\NewsletterMail($this->newsletter, $this->subscriber)
            );
        } catch (\Exception $e) {
            Log::error('Failed to send newsletter to ' . $this->subscriber->email . ': ' . $e->getMessage());
            throw $e; // Re-throw to mark job as failed
        }
    }
}


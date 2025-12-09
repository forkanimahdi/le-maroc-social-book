<?php

namespace App\Http\Controllers;

use App\Mail\NewsletterWelcomeMail;
use App\Models\Subscriber;
use App\Rules\ValidEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', new ValidEmail()],
        ]);

        $existing = Subscriber::where('email', $validated['email'])->first();

        if ($existing) {
            if ($existing->unsubscribed_at) {
                $existing->update([
                    'nom' => $validated['nom'],
                    'unsubscribed_at' => null,
                    'unsubscribe_token' => Str::random(40),
                ]);

                // Send welcome email for reactivated subscription
                try {
                    Mail::to($existing->email)->send(new NewsletterWelcomeMail($existing));
                    Log::info('Welcome email sent to reactivated subscriber: ' . $existing->email);
                } catch (\Exception $e) {
                    Log::error('Failed to send welcome email to ' . $existing->email . ': ' . $e->getMessage());
                }

                return back()->with('success', "Votre abonnement a été réactivé. Merci de continuer l'aventure avec moi.");
            }

            return back()->withErrors([
                'email' => 'Cet email est déjà abonné à la newsletter.',
            ]);
        }

        $subscriber = Subscriber::create([
            'nom' => $validated['nom'],
            'email' => $validated['email'],
        ]);

        // Send welcome email
        try {
            Mail::to($subscriber->email)->send(new NewsletterWelcomeMail($subscriber));
            Log::info('Welcome email sent to new subscriber: ' . $subscriber->email);
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error('Failed to send welcome email to ' . $subscriber->email . ': ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
        }

        return back()->with('success', 'Merci pour votre inscription à ma newsletter.');
    }

    public function unsubscribe(string $token)
    {
        $subscriber = Subscriber::where('unsubscribe_token', $token)->first();

        if (!$subscriber) {
            return view('newsletter-unsubscribe', [
                'status' => 'error',
                'message' => 'Le lien de désabonnement n’est plus valide.',
            ]);
        }

        if ($subscriber->unsubscribed_at) {
            return view('newsletter-unsubscribe', [
                'status' => 'info',
                'message' => 'Vous êtes déjà désabonné·e.',
            ]);
        }

        $subscriber->update([
            'unsubscribed_at' => now(),
        ]);

        return view('newsletter-unsubscribe', [
            'status' => 'success',
            'message' => 'Vous êtes désabonné·e. Merci pour votre soutien jusqu’ici.',
        ]);
    }
}



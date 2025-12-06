<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupSignupRequest;
use App\Mail\ThinkTankRegistrationMail;
use App\Models\GroupSignup;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class GroupSignupController extends Controller
{
    public function store(GroupSignupRequest $request)
    {
        $validated = $request->validated();
        
        // Get WhatsApp channel + group links
        $whatsappLinks = $this->getWhatsAppLinks($validated['group']);
        
        // Handle CV upload if provided
        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }
        
        // Create signup
        $signup = GroupSignup::create([
            'group' => $validated['group'],
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            'linkedin_url' => $validated['linkedin_url'] ?? null,
            'cv_path' => $cvPath,
            'presentation' => $validated['presentation'],
            'domaine' => $validated['domaine'] ?? null,
            'domain_expertise' => $validated['domain_expertise'] ?? null,
            'motivation' => $validated['motivation'] ?? null,
            'status' => 'pending',
            'whatsapp_community_link' => $whatsappLinks['channel'],
        ]);

        // Send registration confirmation email (synchronously, not queued)
        try {
            Mail::to($signup->email)->send(new ThinkTankRegistrationMail($signup, $whatsappLinks['channel']));
            Log::info('Registration email sent to: ' . $signup->email);
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error('Failed to send registration email to ' . $signup->email . ': ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
        }

        return back()->with([
            'success' => 'Inscription enregistrée avec succès.',
            'whatsapp_channel_link' => $whatsappLinks['channel'],
            'whatsapp_community_link' => $whatsappLinks['channel'],
        ]);
    }

    private function getWhatsAppLinks($group)
    {
        $channelLink = config('app.whatsapp_channel', 'https://whatsapp.com/channel/0029VbBiZRoBqbr6YF6zgE3i');

        $groupLinks = [
            'jeunesse' => env('WHATSAPP_GROUP_JEUNESSE', config('app.whatsapp_group_jeunesse', 'https://chat.whatsapp.com/jeunesse-group')),
            'femmes' => env('WHATSAPP_GROUP_FEMMES', config('app.whatsapp_group_femmes', 'https://chat.whatsapp.com/femmes-group')),
            'vieillissement' => env('WHATSAPP_GROUP_VIEILLISSEMENT', config('app.whatsapp_group_vieillissement', 'https://chat.whatsapp.com/vieillissement-group')),
            'pacte' => env('WHATSAPP_GROUP_PACTE', config('app.whatsapp_group_pacte', 'https://chat.whatsapp.com/pacte-group')),
        ];

        return [
            'channel' => $channelLink,
            'community' => $channelLink,
            'group' => $groupLinks[$group] ?? env('WHATSAPP_GROUP_LINK', 'https://chat.whatsapp.com/example-group'),
        ];
    }
}



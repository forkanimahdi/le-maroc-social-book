<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupSignupRequest;
use App\Mail\ThinkTankRegistrationMail;
use App\Models\GroupSignup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class GroupSignupController extends Controller
{
    public function store(GroupSignupRequest $request)
    {
        $validated = $request->validated();
        
        // Get WhatsApp community link based on group
        $whatsappLinks = $this->getWhatsAppLinks($validated['group']);
        
        // Create signup
        $signup = GroupSignup::create([
            'group' => $validated['group'],
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            'domaine' => $validated['domaine'] ?? null,
            'domain_expertise' => $validated['domain_expertise'] ?? null,
            'motivation' => $validated['motivation'] ?? null,
            'status' => 'pending',
            'whatsapp_community_link' => $whatsappLinks['community'],
        ]);

        // Send registration confirmation email (synchronously, not queued)
        try {
            Mail::to($signup->email)->send(new ThinkTankRegistrationMail($signup, $whatsappLinks['community']));
            Log::info('Registration email sent to: ' . $signup->email);
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error('Failed to send registration email to ' . $signup->email . ': ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
        }

        return back()->with([
            'success' => 'Inscription enregistrée avec succès.',
            'whatsapp_community_link' => $whatsappLinks['community'],
        ]);
    }

    private function getWhatsAppLinks($group)
    {
        $links = [
            'jeunesse' => [
                'community' => env('WHATSAPP_COMMUNITY_JEUNESSE', config('app.whatsapp_community_jeunesse', 'https://chat.whatsapp.com/jeunesse-community')),
                'group' => env('WHATSAPP_GROUP_JEUNESSE', config('app.whatsapp_group_jeunesse', 'https://chat.whatsapp.com/jeunesse-group')),
            ],
            'femmes' => [
                'community' => env('WHATSAPP_COMMUNITY_FEMMES', config('app.whatsapp_community_femmes', 'https://chat.whatsapp.com/femmes-community')),
                'group' => env('WHATSAPP_GROUP_FEMMES', config('app.whatsapp_group_femmes', 'https://chat.whatsapp.com/femmes-group')),
            ],
            'vieillissement' => [
                'community' => env('WHATSAPP_COMMUNITY_VIEILLISSEMENT', config('app.whatsapp_community_vieillissement', 'https://chat.whatsapp.com/vieillissement-community')),
                'group' => env('WHATSAPP_GROUP_VIEILLISSEMENT', config('app.whatsapp_group_vieillissement', 'https://chat.whatsapp.com/vieillissement-group')),
            ],
            'pacte' => [
                'community' => env('WHATSAPP_COMMUNITY_PACTE', config('app.whatsapp_community_pacte', 'https://chat.whatsapp.com/pacte-community')),
                'group' => env('WHATSAPP_GROUP_PACTE', config('app.whatsapp_group_pacte', 'https://chat.whatsapp.com/pacte-group')),
            ],
        ];

        return $links[$group] ?? [
            'community' => env('WHATSAPP_COMMUNITY_LINK', 'https://chat.whatsapp.com/example'),
            'group' => env('WHATSAPP_GROUP_LINK', 'https://chat.whatsapp.com/example-group'),
        ];
    }
}



<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupSignupRequest;
use App\Mail\ThinkTankRegistrationMail;
use App\Models\GroupSignup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class GroupSignupController extends Controller
{
    public function store(GroupSignupRequest $request)
    {
        $validated = $request->validated();
        
        // Get WhatsApp community link from config or env
        $whatsappCommunityLink = config('app.whatsapp_community_link', env('WHATSAPP_COMMUNITY_LINK', 'https://chat.whatsapp.com/example'));
        
        // Create signup
        $signup = GroupSignup::create([
            'group' => $validated['group'],
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            'domaine' => $validated['domaine'] ?? null,
            'domain_expertise' => $validated['domain_expertise'] ?? null,
            'motivation' => $validated['motivation'] ?? null,
            'status' => 'pending',
            'whatsapp_community_link' => $whatsappCommunityLink,
        ]);

        // Send registration confirmation email
        try {
            Mail::to($signup->email)->send(new ThinkTankRegistrationMail($signup, $whatsappCommunityLink));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Failed to send registration email: ' . $e->getMessage());
        }

        // Check if this is an API request (JSON)
        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Inscription enregistrée avec succès.',
                'whatsapp_community_link' => $whatsappCommunityLink,
            ]);
        }

        return back()->with([
            'success' => true,
            'message' => 'Inscription enregistrée avec succès.',
            'whatsapp_community_link' => $whatsappCommunityLink,
        ]);
    }
}



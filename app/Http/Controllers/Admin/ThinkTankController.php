<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ThinkTankApprovalMail;
use App\Models\GroupSignup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ThinkTankController extends Controller
{
    public function index(Request $request)
    {
        // Get all signups - filtering will be done on frontend
        $signups = GroupSignup::orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/think-tank', [
            'signups' => $signups,
            'stats' => [
                'total' => $signups->count(),
                'pending' => $signups->where('status', 'pending')->count(),
                'approved' => $signups->where('status', 'approved')->count(),
                'rejected' => $signups->whereIn('status', ['rejected', 'declined'])->count(),
            ],
        ]);
    }

    public function approve(Request $request, $id)
    {
        $signup = GroupSignup::findOrFail($id);

        if ($signup->status !== 'pending') {
            return back()->with('error', 'Cette inscription a déjà été traitée.');
        }

        // Get WhatsApp group link based on the signup's group
        $whatsappLinks = $this->getWhatsAppLinks($signup->group);
        $whatsappGroupLink = $whatsappLinks['group'];

        // Update signup
        $signup->update([
            'status' => 'approved',
            'whatsapp_group_link' => $whatsappGroupLink,
            'approved_at' => now(),
        ]);

        // Send approval email (synchronously, not queued)
        try {
            Mail::to($signup->email)->send(new ThinkTankApprovalMail($signup, $whatsappGroupLink));
            Log::info('Approval email sent to: ' . $signup->email);
        } catch (\Exception $e) {
            Log::error('Failed to send approval email to ' . $signup->email . ': ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
        }

        return back()->with('success', 'Inscription approuvée avec succès.');
    }

    public function reject(Request $request, $id)
    {
        $signup = GroupSignup::findOrFail($id);

        if ($signup->status !== 'pending') {
            return back()->with('error', 'Cette inscription a déjà été traitée.');
        }

        $signup->update([
            'status' => 'rejected',
            'rejected_at' => now(),
        ]);

        return back()->with('success', 'Inscription rejetée.');
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


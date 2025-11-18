<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ThinkTankApprovalMail;
use App\Models\GroupSignup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ThinkTankController extends Controller
{
    public function index(Request $request)
    {
        $query = GroupSignup::query();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('group', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by group
        if ($request->has('group') && $request->group) {
            $query->where('group', $request->group);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $signups = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return Inertia::render('admin/think-tank', [
            'signups' => $signups,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'group' => $request->group,
            ],
            'stats' => [
                'total' => GroupSignup::count(),
                'pending' => GroupSignup::where('status', 'pending')->count(),
                'approved' => GroupSignup::where('status', 'approved')->count(),
                'rejected' => GroupSignup::whereIn('status', ['rejected', 'declined'])->count(),
            ],
        ]);
    }

    public function approve(Request $request, $id)
    {
        $signup = GroupSignup::findOrFail($id);

        if ($signup->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cette inscription a déjà été traitée.',
            ], 400);
        }

        // Get WhatsApp group link from config or env
        $whatsappGroupLink = config('app.whatsapp_group_link', env('WHATSAPP_GROUP_LINK', 'https://chat.whatsapp.com/example-group'));

        // Update signup
        $signup->update([
            'status' => 'approved',
            'whatsapp_group_link' => $whatsappGroupLink,
            'approved_at' => now(),
        ]);

        // Send approval email
        try {
            Mail::to($signup->email)->send(new ThinkTankApprovalMail($signup, $whatsappGroupLink));
        } catch (\Exception $e) {
            \Log::error('Failed to send approval email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Inscription approuvée avec succès.',
        ]);
    }

    public function reject(Request $request, $id)
    {
        $signup = GroupSignup::findOrFail($id);

        if ($signup->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cette inscription a déjà été traitée.',
            ], 400);
        }

        $signup->update([
            'status' => 'rejected',
            'rejected_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Inscription rejetée.',
        ]);
    }

    public function decline(Request $request, $id)
    {
        $signup = GroupSignup::findOrFail($id);

        if ($signup->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cette inscription a déjà été traitée.',
            ], 400);
        }

        $signup->update([
            'status' => 'declined',
            'rejected_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Inscription déclinée.',
        ]);
    }
}


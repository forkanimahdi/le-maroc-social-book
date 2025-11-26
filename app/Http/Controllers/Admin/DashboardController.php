<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\EventParticipant;
use App\Models\GroupSignup;
use App\Models\Idea;
use App\Models\Subscriber;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'ideas' => Idea::count(),
                'ideas_pending' => Idea::where('status', 'pending')->count(),
                'think_tank_total' => GroupSignup::count(),
                'think_tank_pending' => GroupSignup::where('status', 'pending')->count(),
                'think_tank_approved' => GroupSignup::where('status', 'approved')->count(),
                'event_participants_total' => EventParticipant::count(),
                'event_participants_pending' => EventParticipant::where('status', 'pending')->count(),
                'event_participants_approved' => EventParticipant::where('status', 'approved')->count(),
                'subscribers' => Subscriber::count(),
                'subscribers_active' => Subscriber::whereNull('unsubscribed_at')->count(),
                'messages_total' => ContactMessage::count(),
                'messages_pending' => ContactMessage::where('status', 'pending')->count(),
            ],
        ]);
    }

    public function ideas()
    {
        $ideas = Idea::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('admin/ideas', [
            'ideas' => $ideas,
        ]);
    }
}



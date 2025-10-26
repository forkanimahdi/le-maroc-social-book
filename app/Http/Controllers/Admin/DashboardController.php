<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Episode;
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
                'signups' => GroupSignup::count(),
                'subscribers' => Subscriber::count(),
                'episodes' => Episode::count(),
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



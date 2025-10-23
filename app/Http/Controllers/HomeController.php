<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Idea;
use App\Models\PodcastEpisode;
use App\Models\Content;

class HomeController extends Controller
{
    public function index()
    {
        // Get approved ideas for the IdeasBox component
        $ideas = Idea::where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Get published podcast episodes
        $episodes = PodcastEpisode::where('status', 'published')
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($episode) {
                return [
                    'id' => $episode->id,
                    'titre' => $episode->title,
                    'intervenants' => $episode->guests,
                    'theme' => $episode->theme,
                    'description' => $episode->description,
                    'duration' => $episode->duration,
                    'date' => $episode->date->format('d F Y'),
                    'platforms' => $episode->platforms,
                ];
            });

        // Get content for the Author component
        $content = Content::first();

        return Inertia::render('Home', [
            'ideas' => $ideas,
            'episodes' => $episodes,
            'content' => $content,
        ]);
    }
}

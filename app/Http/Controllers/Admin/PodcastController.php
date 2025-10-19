<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PodcastController extends Controller
{
    public function index()
    {
        $episodes = \App\Models\PodcastEpisode::orderBy('date', 'desc')->get();
        
        return Inertia::render('admin/podcasts', [
            'episodes' => $episodes
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'guests' => 'required|string|max:255',
            'theme' => 'required|string|max:255',
            'duration' => 'required|string|max:50',
            'date' => 'required|date',
            'platforms' => 'required|array',
            'audio_url' => 'required|url',
            'status' => 'required|in:draft,published',
        ]);
        
        $episode = \App\Models\PodcastEpisode::create([
            'title' => $request->title,
            'description' => $request->description,
            'guests' => $request->guests,
            'theme' => $request->theme,
            'duration' => $request->duration,
            'date' => $request->date,
            'platforms' => json_encode($request->platforms),
            'audio_url' => $request->audio_url,
            'status' => $request->status,
        ]);
        
        return redirect()->back()->with('success', 'Épisode créé avec succès !');
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'guests' => 'required|string|max:255',
            'theme' => 'required|string|max:255',
            'duration' => 'required|string|max:50',
            'date' => 'required|date',
            'platforms' => 'required|array',
            'audio_url' => 'required|url',
            'status' => 'required|in:draft,published',
        ]);
        
        $episode = \App\Models\PodcastEpisode::findOrFail($id);
        $episode->update([
            'title' => $request->title,
            'description' => $request->description,
            'guests' => $request->guests,
            'theme' => $request->theme,
            'duration' => $request->duration,
            'date' => $request->date,
            'platforms' => json_encode($request->platforms),
            'audio_url' => $request->audio_url,
            'status' => $request->status,
        ]);
        
        return redirect()->back()->with('success', 'Épisode mis à jour avec succès !');
    }
    
    public function destroy($id)
    {
        $episode = \App\Models\PodcastEpisode::findOrFail($id);
        $episode->delete();
        
        return redirect()->back()->with('success', 'Épisode supprimé avec succès !');
    }
}

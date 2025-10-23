<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Content;

class ContentController extends Controller
{
    public function index()
    {
        // Get content from database or return empty model
        $content = Content::first() ?? new Content();
        
        return Inertia::render('admin/content', [
            'content' => $content
        ]);
    }
    
    public function update(Request $request)
    {
        $request->validate([
            'bio_title' => 'required|string|max:255',
            'bio_content' => 'required|string',
            'bio_quote' => 'required|string|max:500',
            'social_linkedin' => 'nullable|url',
            'social_twitter' => 'nullable|url',
            'social_instagram' => 'nullable|url',
        ]);
        
        // Ensure a single row persists
        $content = Content::first();
        if (!$content) {
            $content = Content::create([
                'bio_title' => $request->bio_title,
                'bio_content' => $request->bio_content,
                'bio_quote' => $request->bio_quote,
                'social_linkedin' => $request->social_linkedin,
                'social_twitter' => $request->social_twitter,
                'social_instagram' => $request->social_instagram,
            ]);
        } else {
            $content->update([
                'bio_title' => $request->bio_title,
                'bio_content' => $request->bio_content,
                'bio_quote' => $request->bio_quote,
                'social_linkedin' => $request->social_linkedin,
                'social_twitter' => $request->social_twitter,
                'social_instagram' => $request->social_instagram,
            ]);
        }
        
        return redirect()->back()->with('success', 'Contenu mis à jour avec succès !');
    }
    
    public function updateImages(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*.title' => 'required|string|max:255',
            'images.*.url' => 'required|url',
            'images.*.alt' => 'required|string|max:255',
        ]);
        
        $content = Content::first();
        if (!$content) {
            $content = Content::create([
                'bio_title' => 'Titre',
                'bio_content' => '',
                'bio_quote' => '',
                'images' => $request->images,
            ]);
        } else {
            // Model casts will handle array -> json
            $content->update([
                'images' => $request->images,
            ]);
        }
        
        return redirect()->back()->with('success', 'Images mises à jour avec succès !');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index()
    {
        // Get content from database or return default
        $content = \App\Models\Content::first() ?? new \App\Models\Content();
        
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
        
        $content = \App\Models\Content::firstOrNew();
        $content->update([
            'bio_title' => $request->bio_title,
            'bio_content' => $request->bio_content,
            'bio_quote' => $request->bio_quote,
            'social_linkedin' => $request->social_linkedin,
            'social_twitter' => $request->social_twitter,
            'social_instagram' => $request->social_instagram,
        ]);
        
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
        
        $content = \App\Models\Content::firstOrNew();
        $content->update([
            'images' => json_encode($request->images)
        ]);
        
        return redirect()->back()->with('success', 'Images mises à jour avec succès !');
    }
}

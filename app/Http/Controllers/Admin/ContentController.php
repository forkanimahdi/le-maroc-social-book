<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Content;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function index()
    {
        // Get content from database or return empty model
        $content = Content::first() ?? new Content();
        
        // Ensure images is always an array and convert storage URLs
        if ($content->images && is_array($content->images)) {
            $content->images = array_map(function($image) {
                if (isset($image['url']) && strpos($image['url'], 'storage/') === 0) {
                    $image['url'] = Storage::url($image['url']);
                }
                return $image;
            }, $content->images);
        } else {
            $content->images = [];
        }
        
        return Inertia::render('admin/content', [
            'content' => $content
        ]);
    }
    
    public function update(Request $request)
    {
        try {
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
            
            return redirect()->route('admin.content')->with('success', 'Contenu mis à jour avec succès !');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la sauvegarde : ' . $e->getMessage());
        }
    }
    
    public function updateImages(Request $request)
    {
        
        try {
            $request->validate([
                'images' => 'required|string',
            ]);
            
            $imagesData = json_decode($request->images, true);
            
            // Handle empty array
            if (empty($imagesData) || !is_array($imagesData)) {
                return redirect()->route('admin.content')->with('error', 'Aucune image à sauvegarder.');
            }
            
            // Handle file uploads and prepare images
            $processedImages = [];
            foreach ($imagesData as $index => $image) {
                // Check if there's a file for this image
                $fileKey = "image_{$index}";
                if ($request->hasFile($fileKey)) {
                    $file = $request->file($fileKey);
                    $path = $file->store('content/images', 'public');
                    $image['url'] = 'storage/' . $path;
                }
                
                // Include all images, even those without files or URLs
                $processedImages[] = $image;
            }
            
            $content = Content::first();
            if (!$content) {
                $content = Content::create([
                    'bio_title' => 'Titre',
                    'bio_content' => '',
                    'bio_quote' => '',
                    'images' => $processedImages,
                ]);
            } else {
                // Simply replace all images
                $content->update([
                    'images' => $processedImages,
                ]);
            }
            
            return redirect()->route('admin.content')->with('success', 'Images mises à jour avec succès !');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la sauvegarde des images : ' . $e->getMessage());
        }
    }
}

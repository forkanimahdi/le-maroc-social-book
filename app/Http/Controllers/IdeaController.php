<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'text' => ['required', 'string'],
            'agree' => ['required', 'boolean'],
        ]);
        $idea = Idea::create($validated);
        return back()->with('success', 'Idée soumise.');
    }

    public function update(Request $request, Idea $idea)
    {
        $validated = $request->validate([
            'full_name' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'text' => ['nullable', 'string'],
        ]);
        
        $idea->update(array_filter($validated));
        
        return back()->with('success', 'Idée mise à jour avec succès.');
    }

    public function moderate(Idea $idea)
    {
        $idea->update(['status' => 'approved']);
        return back();
    }

    public function reject(Idea $idea)
    {
        $idea->update(['status' => 'rejected']);
        return back();
    }
}



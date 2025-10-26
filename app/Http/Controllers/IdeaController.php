<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => ['required', 'string'],
            'agree' => ['required', 'boolean'],
        ]);
        $idea = Idea::create($validated);
        return back()->with('success', 'Idée soumise.');
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



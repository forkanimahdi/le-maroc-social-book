<?php

namespace App\Http\Controllers;

use App\Models\GroupSignup;
use Illuminate\Http\Request;

class GroupSignupController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'group' => ['required', 'string'],
            'nom' => ['required', 'string'],
            'email' => ['required', 'email'],
            'domaine' => ['nullable', 'string'],
            'motivation' => ['nullable', 'string'],
        ]);
        GroupSignup::create($validated);
        return back()->with('success', 'Inscription enregistrée.');
    }
}



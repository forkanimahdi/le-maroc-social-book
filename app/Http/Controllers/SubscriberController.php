<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use App\Rules\ValidEmail;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', "unique:subscribers,email", new ValidEmail()],
        ]);

        Subscriber::create([
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            // 'status' => 'active',
            // 'subscribed_at' => now(),
        ]);
     
        

        return back()->with('success', 'Inscription à la newsletter enregistrée avec succès.');
    }
}



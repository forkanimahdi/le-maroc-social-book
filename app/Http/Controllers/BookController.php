<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ExecutiveSummaryMail;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function sendExecutiveSummary(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'pays' => 'nullable|string|max:255',
            'version' => 'required|in:français,arabe',
            'acceptTerms' => 'required|accepted',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        try {
            // Send the email with attachment
            Mail::to($request->email)->send(
                new ExecutiveSummaryMail(
                    $request->prenom,
                    $request->nom,
                    $request->email,
                    $request->version
                )
            );

            return back()->with('success', 'Le résumé exécutif a été envoyé avec succès à votre adresse e-mail.');
        } catch (\Exception $e) {
            return back()->with('error', 'Une erreur est survenue lors de l\'envoi de l\'e-mail. Veuillez réessayer plus tard.');
        }
    }
}


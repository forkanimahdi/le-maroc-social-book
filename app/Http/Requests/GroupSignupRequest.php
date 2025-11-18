<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GroupSignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'group' => ['required', 'string', 'in:jeunesse,femmes,vieillissement,pacte'],
            'nom' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'domaine' => ['nullable', 'string', 'max:255'],
            'domain_expertise' => ['nullable', 'string', 'max:500'],
            'motivation' => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'group.required' => 'Veuillez sélectionner un groupe de travail.',
            'group.in' => 'Le groupe sélectionné n\'est pas valide.',
            'nom.required' => 'Le nom complet est requis.',
            'email.required' => 'L\'adresse e-mail est requise.',
            'email.email' => 'L\'adresse e-mail doit être valide.',
        ];
    }
}


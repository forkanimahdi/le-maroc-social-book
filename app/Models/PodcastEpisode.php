<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PodcastEpisode extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'guests',
        'theme',
        'duration',
        'date',
        'platforms',
        'audio_url',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
        'platforms' => 'array',
    ];
}

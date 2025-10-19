<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use HasFactory;

    protected $table = 'content';

    protected $fillable = [
        'bio_title',
        'bio_content',
        'bio_quote',
        'images',
        'social_linkedin',
        'social_twitter',
        'social_instagram',
    ];

    protected $casts = [
        'images' => 'array',
    ];
}
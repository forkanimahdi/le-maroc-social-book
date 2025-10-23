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

    public function getImagesAttribute($value)
    {
        if (is_string($value)) {
            return json_decode($value, true) ?? [];
        }
        return $value ?? [];
    }

    public function setImagesAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['images'] = json_encode($value);
        } else {
            $this->attributes['images'] = $value;
        }
    }
}
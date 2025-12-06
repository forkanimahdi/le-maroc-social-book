<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupSignup extends Model
{
    use HasFactory;

    protected $fillable = [
        'group',
        'nom',
        'email',
        'linkedin_url',
        'cv_path',
        'presentation',
        'domaine',
        'domain_expertise',
        'motivation',
        'status',
        'whatsapp_community_link',
        'whatsapp_group_link',
        'approved_at',
        'rejected_at'
    ];

    protected $casts = [
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isRejected(): bool
    {
        return in_array($this->status, ['rejected', 'declined']);
    }
}



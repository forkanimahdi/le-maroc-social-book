<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupSignup extends Model
{
    use HasFactory;

    protected $fillable = ['group', 'nom', 'email', 'domaine', 'motivation'];
}



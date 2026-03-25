<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'user_id',
        'company',
        'role',
        'status',
        'date_applied',
        'notes',
        'salary_min',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

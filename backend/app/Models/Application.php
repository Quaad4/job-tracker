<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    /** @use HasFactory<UserFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company',
        'role',
        'status',
        'date_applied',
        'notes',
        'salary_min',
    ];

    protected $casts = [
        'date_applied' => 'date:Y-m-d',
        'salary_min'   => 'integer',
        'created_at'   => 'datetime:Y-m-d H:i:s',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

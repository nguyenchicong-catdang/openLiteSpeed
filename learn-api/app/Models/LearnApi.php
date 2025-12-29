<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

//use Illuminate\Database\Eloquent\Model;

class LearnApi extends Authenticatable
{
    // LearnApi::attempt(['username' => 'admin', 'password' => '12345']);
    /** @use HasFactory<\Database\Factories\LearnApiFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'username',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];
    // bat mat khau
    // protected $casts = [
    //     'password' => 'hashed',
    // ];
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            //'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}

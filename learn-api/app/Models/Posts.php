<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    /** @use HasFactory<\Database\Factories\PostsFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content'
    ];
    // protected $casts = [
    //     'content' => 'json' // // Hoặc 'array'
    // ];

    /**
     * Get the attributes that should be cast.
     *
     * @return json
     */
    protected function casts(): array
    {
        return [
            'content' => 'json',
        ];
    }
}

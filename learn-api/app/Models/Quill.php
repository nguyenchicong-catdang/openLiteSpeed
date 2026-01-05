<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quill extends Model
{
    /** @use HasFactory<\Database\Factories\QuillFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'delta_content',
        'html_content'
    ];

    protected function casts():array
    {
        return [
            'delta_content' => 'json'
        ];
    }
}

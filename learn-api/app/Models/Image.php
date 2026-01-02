<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /** @use HasFactory<\Database\Factories\ImageFactory> */
    use HasFactory;

    protected $fillable = [
        'path',
        'filename'
    ];
}

// Migration cho quan hệ đa hình:
// $table->morphs('imageable'); // Tự động tạo imageable_id và imageable_type

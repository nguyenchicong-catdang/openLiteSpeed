<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    /** @use HasFactory<\Database\Factories\MediaFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'type',
        'size'
    ];

    // Truy vấn nhanh các file
    public function scopeImages($query) {
        return $query->where('type', 'image');
    }

    public function scopePdfs($query) {
        return $query->where('type', 'pdf');
    }

}

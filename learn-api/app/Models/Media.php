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
        'size',
        // Thuộc tính mở rộng (Nullable vì không phải file nào cũng có)
        'alt',
        'caption',
        'duration',
        'thumbnail_path',
        'author'
    ];

    // Truy vấn nhanh các file
    public function scopeImages($query) {
        return $query->where('type', 'image');
    }

    public function scopePdfs($query) {
        return $query->where('type', 'pdf');
    }
    // thêm URL
    // protected $appends = ['url']; // Tự động thêm trường 'url' vào JSON

    // public function getUrlAttribute() {
    //     return asset('storage/'. $this->path);
    // }
}

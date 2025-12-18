<?php

namespace SrcApp\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable; // Bắt buộc dùng class này

class LoginModel extends Authenticatable 
{
    protected $table = 'logins';

    // Cho phép nạp dữ liệu nhanh vào các cột này
    protected $fillable = [
        'username',
        'password',
    ];

    // Ẩn mật khẩu khi xuất dữ liệu ra JSON (bảo mật)
    protected $hidden = [
        'password',
        'remember_token',
    ];
    // Ghi đè phương thức này để Laravel biết bạn dùng 'username' làm định danh
    public function getAuthIdentifierName()
    {
        return 'username';
    }
}
//make:migration
// tinker
// \SrcApp\Models\LoginModel::create([
//     'username' => 'admin', 
//     'password' => Hash::make('123456')
// ]);

// \SrcApp\Models\LoginModel::all();
<?php

namespace SrcApp\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
//use Illuminate\Database\Eloquent\Model;

class LearnApi extends Authenticatable
{
    //
    use HasApiTokens;
    protected $table = 'learn_apis'; // Chỉ định rõ tên bảng
    //https://laravel.com/docs/12.x/eloquent#allowing-mass-assignment
    //protected $guarded = [];
    protected $fillable = [
        'username',
        'password',
        'api_key' // Nếu bạn có cột này
    ];
}

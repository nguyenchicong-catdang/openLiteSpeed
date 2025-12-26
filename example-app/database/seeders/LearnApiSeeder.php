<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LearnApiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \SrcApp\Models\LearnApi::create([
            'username' => 'admin',
            'password' => bcrypt('123456'), // Luôn luôn mã hóa password
            'api_key'  => 'key_mac_dinh_cua_ban', // Thêm dòng này để tránh lỗi NOT NULL
        ]);
    }
}
// php artisan migrate:fresh --seed
// php artisan make:seeder LearnApiSeeder
// php artisan db:seed --class=LearnApiSeeder

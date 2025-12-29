<?php

namespace Database\Seeders;

use App\Models\LearnApi;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LearnApiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // tao tk admin
        // goi model
        LearnApi::create([
            'username' => 'admin',
            'password' => Hash::make('12345')
        ]);

        // tao gia lap 10 tk
        LearnApi::factory(10)->create();
    }
}

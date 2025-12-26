<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('learn_apis', function (Blueprint $table) {
            $table->id();

            // Trường đăng nhập (Có thể dùng username hoặc email)
            //$table->string('username')->unique(;
            $table->string('username');

            // Password phải đủ độ dài để lưu chuỗi đã Bcrypt (thường là 255)
            $table->string('password');

            // api_key nếu bạn muốn dùng như một mã định danh tĩnh bổ sung
            //$table->string('api_key')->nullable()->unique();
            $table->string('api_key');

            // (Tùy chọn) Để dùng tính năng "Remember me" của Laravel
            $table->rememberToken();

            // Tạo 2 cột created_at và updated_at
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learn_apis');
    }
};

// php artisan migrate:fresh

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
        Schema::create('logins', function (Blueprint $table) {
            $table->id();
            // Tạo cột username duy nhất để đăng nhập
            $table->string('username')->unique(); 
            // Tạo cột password để lưu mật khẩu đã mã hóa
            $table->string('password');
            // Cần thiết cho chức năng "Remember Me"
            $table->rememberToken(); 
            // Tạo cột created_at và updated_at
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('logins');
    }
};
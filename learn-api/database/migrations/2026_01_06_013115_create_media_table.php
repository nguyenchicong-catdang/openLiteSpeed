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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // ten file goc
            $table->string('path'); // duong dan luu tru
            $table->string('type'); // phan loai: image, php ,video
            $table->bigInteger('size'); // dung luong file
            // Thuộc tính mở rộng (Nullable vì không phải file nào cũng có)
            $table->string('alt')->nullable();
            $table->text('caption')->nullable();
            $table->string('duration')->nullable(); // Video
            $table->string('thumbnail_path')->nullable(); // Video
            $table->integer('author')->nullable(); // PDF

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};

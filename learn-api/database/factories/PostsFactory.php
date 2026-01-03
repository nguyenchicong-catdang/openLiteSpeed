<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Posts>
 */
class PostsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    // public function definition(): array
    // {
    //     return [
    //         //
    //         'title' => fake()->sentence(),
    //         'content' => fake()->paragraphs(5, true)
    //     ];
    // }

    /**
 * Giả lập cấu trúc Delta JSON của Quill
 */

    public function definition(): array
    {
        // Giả lập cấu trúc Delta JSON của Quill
        $quillDelta = [
            'ops' => [
                ['insert' => fake()->sentence(10, true) ."\n"],
                ['insert' => "Văn bản in đậm mẫu", 'attributes' => ['bold' => true]],
                ['insert' => "\nNội dung có chứa "],
                ['insert' => "một đường dẫn link", 'attributes' => ['link' => 'https://google.com']],
                ['insert' => "\nFinal line with "],
                ['insert' => "italic text", 'attributes' => ['italic' => true]],
                ['insert' => "\n"],
            ]
            ];
        return [
            'title' => fake()->realText(50),
            // Laravel sẽ tự encode array này thành JSON nhờ Cast ở Model
            'content' => $quillDelta,
        ];
    }
}

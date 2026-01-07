<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class UpdateMediaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // $type = $this->input('type');
        // // $type = $this->input('type');

        // $rules = match ($type) {
        //     'image' => [
        //         'alt' => 'nullable|string|max:255',
        //         'caption' => 'nullable|string',
        //     ],
        //     'video' => [
        //         'caption' => 'nullable|string',
        //         'duration' => 'nullable|string',
        //     ],
        //     // ... các trường hợp khác
        //     default => [],
        // };

        // // QUAN TRỌNG: Thêm 'type' và 'id' vào rules để Laravel không loại bỏ chúng
        // return array_merge($rules, [
        //     'type' => 'required|string',
        //     'id' => 'required'
        // ]);
        // Log::info($rules);
        // Lấy đối tượng media từ route (ví dụ: /api/media/{media})
        // $media = $this->route('media');
        // // dd($this->route()->parameters());
        // $type = $media->type;
        // $type = $this->input('type');

        // if ($type === 'image') {
        //     return [
        //         'alt' => 'string|nullable|max:255',
        //         'caption' => 'string|nullable'
        //     ];
        // }

        // if ($type === 'video') {
        //     return [
        //         'caption' => 'string|nullable',
        //         'duration' => 'string|nullable',
        //         'thumbnail_path' => 'string|nullable'
        //     ];
        // }

        // if ($type === 'pdf') {
        //     return [
        //         'author' => 'string|nullable'
        //     ];
        // }
        // return [];
        // Lấy 'type' trực tiếp từ dữ liệu Form gửi lên (không cần vào DB)
          $type = $this->input('type');

          return match ($type) {
              'image' => [
                  'alt' => 'nullable|string|max:255',
                  'caption' => 'nullable|string',
              ],
              'video' => [
                  'caption' => 'nullable|string',
                  'duration' => 'nullable|string',
                  'thumbnail_path' => 'nullable|string',
              ],
              'pdf' => [
                  'author' => 'nullable|string|max:255',
              ],
              default => [
                  'caption' => 'nullable|string',
              ],
          };
        //   return [
        //      'image' => ['alt' => 'string|nullable', 'caption' => 'string|nullable'],
        //      'video' => ['caption' => 'string|nullable', 'thumbnail_path' => 'string|nullable'],
        //      'pdf'   => ['author' => 'string|nullable'],
        //   ];

        // Thêm dòng này
        // Log::info('Dữ liệu thô $this->all():', $this->all());
        // $type = $this->input('type');

        // $rules = match ($type) {
        //     'image' => [
        //         'alt' => 'nullable|string|max:255',
        //         'caption' => 'nullable|string',
        //     ],
        //     // ... các case khác
        //     default => [],
        // };

        // $finalRules = array_merge($rules, [
        //     'type' => 'required|string',
        //     // 'id' => 'required'
        // ]);

        // // ĐẶT LOG Ở ĐÂY
        // Log::info('Final Rules:', $finalRules);

        // return $finalRules;
        // $type = $this->input('type');

        // // Tạo mảng rule cơ bản cho mọi loại file
        // $rules = [
        //     'type'    => 'required|string',
        //     'alt'     => 'nullable|string|max:255',
        //     'caption' => 'nullable|string',
        // ];

        // // Bổ sung thêm các rule đặc thù cho từng loại
        // if ($type === 'video') {
        //     $rules['duration'] = 'nullable|string';
        //     $rules['thumbnail_path'] = 'nullable|string';
        // }

        // if ($type === 'pdf') {
        //     $rules['author'] = 'nullable|string';
        // }

        // return $rules;
    }
}

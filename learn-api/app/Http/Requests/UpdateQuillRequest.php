<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuillRequest extends FormRequest
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
        return [
            'title' => 'required',
            'delta_content' => [
                'required',
                function ($_attribute, $value, $fail) {
                    $ops = json_decode($value, true)['ops'] ?? [];
                    $text = collect($ops)->pluck('insert')->implode('');
                    if (empty(trim($text))) {
                        $fail('Cấu trúc Delta không có nội dung thực tế.');
                    }
                }
            ],
            'html_content' => [
                'required',
                function ($_attribute, $value, $fail) {
                    if (empty(trim(strip_tags($value)))) {
                        $fail('Nội dung không được chỉ chứa khoảng trắng hoặc thẻ trống.');
                    }
                }
            ]
        ];
    }
}

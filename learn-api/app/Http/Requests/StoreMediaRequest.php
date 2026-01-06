<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
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
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,pdf,mp4,mov,avi|max:20480',
        ];
    }
    /**
     * Hàm bổ trợ để lấy định dạng file (loại bỏ logic khỏi Controller)
     */

    public function getFileType(): string
    {
        $extension = strtolower($this->file('file')->getClientOriginalExtension());
        if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
            return 'image';
        }
        if (in_array($extension, ['mp4', 'mov', 'avi'])) {
            return 'video';
        }
        if ($extension === 'pdf') {
            return 'pdf';
        }
        return 'other';
    }
}

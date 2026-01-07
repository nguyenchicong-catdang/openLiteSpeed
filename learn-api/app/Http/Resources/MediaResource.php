<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'file_name' => $this->name,
            'url'       => asset('storage/' . $this->path),
            'type'      => $this->type,

            // Chỉ trả về 'alt' và 'caption' nếu type là image
            $this->mergeWhen($this->type === 'image', [
                'alt'     => $this->alt,
                'caption' => $this->caption,
            ]),

            // Chỉ trả về 'duration' và 'thumbnail' nếu type là video
            $this->mergeWhen($this->type === 'video', [
                'duration'       => $this->duration,
                'thumbnail_path' => $this->thumbnail_path ? asset('storage/' . $this->thumbnail_path) : null,
            ]),

            // Chỉ trả về 'author' nếu type là pdf
            $this->mergeWhen($this->type === 'pdf', [
                'author' => $this->author,
            ]),
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Models\Media;
use Illuminate\Http\JsonResponse;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request): JsonResponse
    {
        // Validate đã tự động chạy trước khi vào đây
        $file = $request->file('file');
        $type = $request->getFileType(); // Gọi hàm bổ trợ từ FormRequest

        $fileName = time() . '_' . uniqid(). '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs("uploads/{$type}s", $fileName, 'public');
        // Lưu vào DB với Metadata (theo cách dùng JSON đã nói ở trên)
        $media = Media::create([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $type,
            'size' => $file->getSize()
        ]);
        return response()->json($media, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $media)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Media $media)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMediaRequest $request, Media $media)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $media)
    {
        //
    }
}

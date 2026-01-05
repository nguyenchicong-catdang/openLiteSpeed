<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuillRequest;
use App\Http\Requests\UpdateQuillRequest;
use App\Models\Quill;
use Illuminate\Http\JsonResponse;

class QuillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        $quill = Quill::select('id', 'title', 'html_content')->get();
        return response()->json($quill, 200);
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
    public function store(StoreQuillRequest $request):JsonResponse
    {
        $quill = Quill::create($request->validated());
        return response()->json($quill, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quill $quill): JsonResponse
    {
        $data = $quill->only(['id', 'title', 'html_content']);
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quill $quill)
    {
        $data = $quill->only(['id', 'title', 'delta_content']);
        return response()->json($data, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuillRequest $request, Quill $quill): JsonResponse
    {
        $quill->update($request->validated());
        return response()->json($quill, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quill $quill): JsonResponse
    {
        $quill->delete();
        return response()->json(null, 204);
    }
}

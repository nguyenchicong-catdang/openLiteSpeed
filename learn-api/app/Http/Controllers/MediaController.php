<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Http\Resources\MediaResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResource
    {
        // $type = $request->query('type'); // Lấy 'image', 'video', 'pdf' hoặc null
        // $query = Media::query();

        // if ($type && $type !=='all') {
        //     $query->where('type', $type);
        // }
        // $file = $query->latest()->get()->map(function($file){
        //     return [
        //         'id' => $file->id,
        //         'name' => $file->name,
        //         'type' => $file->type,
        //         'url' => asset('storage/'. $file->path), // Tạo URL đầy đủ
        //     ];
        // });

        // return response()->json($file, 200);
        // $type = $request->query('type');
        // $query = Media::select(['id', 'name', 'path', 'type', 'alt', 'caption']);
        // if ($type && $type!== 'all') {
        //     $query->where('type', $type);
        // }

        // $media = $query->latest()->get();
        // // Trả về qua Resource để "trang trí" dữ liệu
        // return MediaResource::collection($media);

        // $type = $request->query('type');

        // $media = Media::when($type && $type !== 'all', function ($query) use ($type) {
        //     return $query->where('type', $type);
        // })
        //     ->latest()
        //     ->get();

        // return MediaResource::collection($media);
        $type = $request->query('type'); // Giả sử là 'all' hoặc null

        $media = Media::query()
            // Nếu $type có giá trị VÀ $type khác 'all' thì mới thực hiện WHERE
            ->when($type && $type !== 'all', function ($query) use ($type) {
                return $query->where('type', $type);
            })
            ->latest()
            ->get();

        return MediaResource::collection($media);
      //   $type = $request->query('type');

      //   // Danh sách các loại file bạn hỗ trợ lọc
      //   $allowedTypes = ['image', 'video', 'pdf'];

      //   $media = Media::query()
      //       // Chỉ lọc nếu $type nằm trong danh sách hỗ trợ
      //       // Nếu $type là 'all', null, hoặc 'abc', nó sẽ bỏ qua WHERE và lấy hết.
      //       ->when(in_array($type, $allowedTypes), function ($query) use ($type) {
      //           return $query->where('type', $type);
      //       })
      //       ->latest()
      //       ->get();

      //   return MediaResource::collection($media);
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
    public function show(Media $medium): JsonResponse
    {
        return response()->json($medium, 200);
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
    public function update(UpdateMediaRequest $request, Media $medium): JsonResponse
    {
        // $validated = $request->validated();
        // // Cập nhật vào Database
        // $media->update($request->validated());
        // return response()->json('',200);
        // $request->validated() sẽ chỉ chứa ['alt', 'caption'] nếu là image
        // $media->update($request->validated());
        // Log::info($media);

        // return response()->json($media, 200);
        // Nếu validated() rỗng, hãy xem thử có lỗi gì không
        // if (empty($request->validated())) {
        //     // Lấy tất cả lỗi validation nếu có
        //     Log::error('Validation Errors:', $request->validator->errors()->toArray());
        // }

        // $media->update($request->validated());
        // return response()->json($media, 200);
        // Lấy dữ liệu đã được validate
        // $validated = $request->validated();

        // if (empty($validated)) {
        //     // Log lỗi chi tiết từ Validator để xem tại sao nó từ chối dữ liệu
        //     Log::error('Validation failed!', [
        //         'errors' => $request->validator->errors()->toArray(),
        //         'received_data' => $request->all()
        //     ]);

        //     // Trả về lỗi để bạn nhìn thấy ở trình duyệt (Network tab)
        //     return response()->json([
        //         'message' => 'Validation rỗng',
        //         'errors' => $request->validator->errors()->toArray()
        //     ], 422);
        // }

        // $media->update($validated);
        // return response()->json($media, 200);
        //$validated = $request->validated();

        // Log ra để xem trong mảng này có 'alt' và 'caption' không
        //Log::info('Dữ liệu sau khi validate:', $validated);

        // Thực hiện update
        $medium->update($request->validated());

        // Log kết quả update (true/false)
        //Log::info('Kết quả update vào DB:', ['success' => $medium]);

        return response()->json('', 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $media)
    {
        //
    }
}

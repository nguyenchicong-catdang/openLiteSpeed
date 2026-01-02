# Cách đồng bộ từ Dev lên Production
## Bước 1: Cấu hình FileSystem
FILESYSTEM_DISK=public
APP_URL=http://your-domain.com  # Ở Dev là http://127.0.0.1:8000

## Bước 2: Chạy lệnh tạo liên kết (Symlink)
php artisan storage:link

## Bước 3: Sử dụng hàm asset() trong Laravel
```bash
return response()->json([
    'imageUrl' => asset('storage/' . $path) 
], 201);
```
## xóa tất cả các file
rm -rf storage/app/public/images/*

## Cách 2: Sử dụng Artisan Tinker (Xóa cả File và Database)
php artisan tinker

```bash
// Xóa sạch file trong thư mục images
Illuminate\Support\Facades\Storage::disk('public')->deleteDirectory('images');

// Tạo lại thư mục trống
Illuminate\Support\Facades\Storage::disk('public')->makeDirectory('images');

// Xóa sạch dữ liệu trong bảng images (nếu bạn có Model Image)
App\Models\Image::truncate();
```

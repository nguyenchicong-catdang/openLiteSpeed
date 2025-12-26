# Tiếp theo: Bạn có muốn tôi hướng dẫn cách viết một Middleware Custom bên trong thư mục src này và cách đăng ký nó vào "Trái tim" SrcAppServiceProvider không?

Việc viết Middleware trong thư mục `src` và đăng ký nó qua Service Provider là bước then chốt để module của bạn có khả năng **tự kiểm soát bảo mật** (ví dụ: chỉ cho phép Admin truy cập vào các route của module đó).

Dưới đây là cách triển khai chi tiết:

### 1. Tạo Middleware bên trong thư mục `src`

Giả sử bạn muốn tạo một Middleware để kiểm tra xem người dùng có phải là "Super Admin" hay không.

**Cấu trúc thư mục:**

```text
src/
├── Http/
│   └── Middleware/
│       └── CheckSuperAdmin.php
└── Providers/
    └── SrcAppServiceProvider.php

```

**File: `src/Http/Middleware/CheckSuperAdmin.php**`

```php
<?php

namespace SrcApp\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Logic kiểm tra giả lập
        if (!$request->user() || $request->user()->role !== 'super-admin') {
            abort(403, 'Bạn không có quyền truy cập vào khu vực này.');
        }

        return $next($request);
    }
}

```

---

### 2. Đăng ký Middleware vào "Trái tim" `SrcAppServiceProvider`

Trong các phiên bản Laravel mới (đặc biệt là Laravel 11+), việc đăng ký Middleware từ một Package/Module có chút khác biệt. Bạn nên đăng ký một **Alias** (bí danh) để có thể gọi ngắn gọn trong file Route.

**File: `src/Providers/SrcAppServiceProvider.php**`

```php
<?php

namespace SrcApp\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\Router;
use SrcApp\Http\Middleware\CheckSuperAdmin;

class SrcAppServiceProvider extends ServiceProvider
{
    public function boot(Router $router)
    {
        // Đăng ký Alias cho Middleware
        // Sau này trong Route chỉ cần gọi ->middleware('is_admin')
        $router->aliasMiddleware('is_admin', CheckSuperAdmin::class);

        // Nếu bạn muốn nạp các Service Provider con khác (như đã học ở bước trước)
        $this->registerSubProviders();
    }

    protected function registerSubProviders()
    {
        $providers = [
            RouteServiceProvider::class,
            ViewServiceProvider::class,
            RepositoryServiceProvider::class,
        ];

        foreach ($providers as $provider) {
            $this->app->register($provider);
        }
    }
}

```

---

### 3. Sử dụng Middleware trong file Route của `src`

Bây giờ, trong file `src/Routes/admin.php` (hoặc bất kỳ file route nào bạn đã nạp), bạn có thể sử dụng bí danh `is_admin` cực kỳ gọn gàng:

```php
use Illuminate\Support\Facades\Route;

Route::prefix('admin-portal')->middleware(['web', 'is_admin'])->group(function () {
    Route::get('/dashboard', 'AdminController@index');
    Route::get('/settings', 'AdminController@settings');
});

```

---

### 4. Tại sao cách làm này tối ưu cho việc "Dự phòng & Update"?

1. **Tính đóng gói (Encapsulation):** Toàn bộ logic bảo mật của module nằm gọn trong `src`. Khi bạn bê thư mục `src` sang một dự án Laravel khác, Middleware này sẽ tự động đi theo và hoạt động ngay mà không cần cấu chỉnh sửa file `app/Http/Kernel.php` của dự án đó.
2. **Dễ dàng gỡ lỗi:** Nếu một route bị chặn vô lý, bạn biết ngay lỗi nằm ở `src/Http/Middleware` chứ không phải do hệ thống chung của Laravel.
3. **Thích ứng với Laravel 11/12:** Từ Laravel 11, file `Kernel.php` truyền thống đã bị loại bỏ. Việc đăng ký qua `Router` trong Service Provider như trên là cách chuẩn nhất để module của bạn tương thích với các kiến trúc mới nhất của framework.

### 5. Lưu ý về "Global Middleware"

Nếu bạn muốn Middleware của mình chạy cho **mọi yêu cầu** (global), bạn không nên dùng `aliasMiddleware`. Thay vào đó, bạn nạp vào nhóm `web`:

```php
$router->pushMiddlewareToGroup('web', CheckSuperAdmin::class);

```

Đến đây, cấu trúc `src` của bạn đã thực sự trở thành một **Mini-Framework** thu nhỏ bên trong Laravel. Bạn có muốn tìm hiểu thêm về cách xử lý **Migrations (Database)** riêng cho thư mục `src` này để khi chạy `php artisan migrate` nó tự nhận diện không?
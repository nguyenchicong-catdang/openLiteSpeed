## Viết logic nạp Route trong Service Provider

<?php

namespace SrcApp\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class SrcAppServiceProvider extends ServiceProvider
{
    /**
     * Namespace dùng cho các Controller trong src (nếu cần)
     */
    protected $namespace = 'SrcApp\Http\Controllers';

    public function boot()
    {
        $this->registerRoutes();
    }

    /**
     * Đăng ký các file route
     */
    protected function registerRoutes()
    {
        // 1. Nạp Web Routes
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(__DIR__ . '/../Routes/web.php');

        // 2. Nạp API Routes (có prefix 'api')
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(__DIR__ . '/../Routes/api.php');

        // 3. Nạp Admin Routes (ví dụ có prefix 'admin' và middleware riêng)
        Route::prefix('admin')
            ->middleware(['web', 'auth']) // Giả sử bạn có middleware auth
            ->namespace($this->namespace)
            ->group(__DIR__ . '/../Routes/admin.php');
    }
}

## Giải thích các thành phần chính:

middleware('web'): Đảm bảo các route trong src cũng nhận được các tính năng như Session, CSRF protection giống như các route mặc định của Laravel.

namespace($this->namespace): Giúp bạn không phải viết đầy đủ namespace trong file route. Ví dụ trong web.php, bạn chỉ cần ghi Route::get('/', 'HomeController@index').

__DIR__: Sử dụng hằng số này để Laravel xác định đúng đường dẫn tuyệt đối đến thư mục src/Routes của bạn, bất kể dự án được cài đặt ở đâu (Local hay Server).

## Cách làm cho Route "Thông minh" hơn (Tự động quét file)
protected function registerRoutes()
{
    $routePath = __DIR__ . '/../Routes';
    
    // Quét tất cả các file .php trong thư mục Routes
    foreach (glob($routePath . '/*.php') as $file) {
        $fileName = basename($file, '.php');
        
        // Tự động gán middleware dựa trên tên file
        $middleware = ($fileName === 'api') ? 'api' : 'web';
        $prefix = ($fileName === 'web') ? '' : $fileName;

        Route::middleware($middleware)
            ->prefix($prefix)
            ->namespace($this->namespace)
            ->group($file);
    }
}
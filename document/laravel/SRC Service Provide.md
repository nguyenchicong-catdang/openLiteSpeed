# SRC Service Provide

## src/Providers/RouteServiceProvider.php
<?php

namespace SrcApp\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'SrcApp\Http\Controllers';

    public function boot()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(__DIR__ . '/../Routes/web.php');
            
        // Bạn có thể thêm các file route khác ở đây
    }
}

## ViewServiceProvider.php
<?php

namespace SrcApp\Providers;

use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Định nghĩa nạp view từ thư mục src
        $this->loadViewsFrom(__DIR__ . '/../Views', 'custom');
    }
}
## File "Trái tim" gộp tất cả (Main Service Provider)
<?php

namespace SrcApp\Providers;

use Illuminate\Support\ServiceProvider;

class SrcAppServiceProvider extends ServiceProvider
{
    /**
     * Danh sách các Provider nội bộ của thư mục src
     */
    protected $providers = [
        RouteServiceProvider::class,
        ViewServiceProvider::class,
        // RepositoryServiceProvider::class, (nếu có)
    ];

    public function register()
    {
        // Lặp qua danh sách và đăng ký chúng vào hệ thống Laravel
        foreach ($this->providers as $provider) {
            $this->app->register($provider);
        }
    }

    public function boot()
    {
        // Hàm boot này có thể để trống hoặc dùng cho các logic chung nhất
    }
}

## Cách đăng ký với dự án Laravel

// bootstrap/providers.php (Laravel 11+)
return [
    App\Providers\AppServiceProvider::class,
    SrcApp\Providers\SrcAppServiceProvider::class, // Chỉ cần gọi file "Trái tim" này
];

## lu y
Một lưu ý nhỏ: Khi bạn dùng $this->app->register(), Laravel sẽ tự động gọi các hàm register() và boot() của các Provider con đó theo đúng vòng đời của Framework.

Bạn có muốn tôi hướng dẫn cách viết một RepositoryServiceProvider để tự động gắn kết (bind) các Interface với các Class logic trong src không? Đây là bước cuối cùng để làm chủ hoàn toàn kiến trúc Modular này.
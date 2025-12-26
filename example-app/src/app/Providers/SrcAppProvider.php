<?php

namespace SrcApp\Providers;

use Illuminate\Support\ServiceProvider;


class SrcAppProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // $this->app->bind(
        //     \SrcApp\Contracts\UserRepositoryInterface::class,
        //     \SrcApp\Repositories\UserRepository::class
        // );
        // Đổi đường dẫn mặc định của Migration
        // Sử dụng cách này nếu bản Laravel của bạn hỗ trợ
        // if (method_exists($this->app, 'useDatabasePath')) {
        //     $this->app->useDatabasePath(base_path('src/database'));
        // }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // 1. Tự động nạp Migrations từ thư mục src
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
        // Ép Laravel dùng LoginModel của bạn cho mọi hoạt động Auth
        config(['auth.providers.users.model' => \SrcApp\Models\LoginModel::class]);
        // view
        $this->loadViewsFrom(base_path('src/app/Views'), 'src');

        // Cho phép copy view ra ngoài bằng lệnh artisan
        // run php artisan vendor:publish --tag=custom-views

        if ($this->app->runningInConsole()) {
            // use -->> php artisan vendor:publish --tag=src-views
            $this->publishes([
                base_path('src/app/Views') => resource_path('views/vendor/custom'),
            ], 'src-views');
        }
        logger('Provider loaded');
    }
}

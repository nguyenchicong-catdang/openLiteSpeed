<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
// thay return -> $app; dirname(__DIR__,2) -> 2 root composer.json
$app = Application::configure(basePath: dirname(__DIR__,2))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
    //commands: dirname(__DIR__, 2) . '/routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

// Thiết lập lại đường dẫn App Path cho instance này
$app->useAppPath(base_path('src/app'));
//$app->register(\SrcApp\Providers\SrcAppProvider::class);
//$app->withRegisteredProviders(require __DIR__ . '/providers.php');
// 2. Nạp danh sách providers từ file providers.php một cách tự động
// ĐĂNG KÝ THỦ CÔNG DANH SÁCH TỪ FILE PROVIDERS.PHP ĐỂ ĐẢM BẢO HIỆU LỰC
// $providers = require __DIR__ . '/providers.php';
// foreach ($providers as $provider) {
//     if (class_exists($provider)) {
//         $app->register($provider);
//     }
// }

/**
 * Dùng Container để đăng ký Service Providers từ file cấu hình
 */
$providers = require __DIR__ . '/providers.php';

foreach ($providers as $provider) {
    // Container sẽ tự động khởi tạo (instantiate) và đăng ký provider này
    $app->register($provider);
}
return $app;

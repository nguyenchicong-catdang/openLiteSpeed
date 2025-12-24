<?php

namespace SrcApp\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Kiểm tra điều kiện: Nếu không có tham số ?admin=1
        if ($request->query('admin') !== '1') {

            // Cách 1: Chuyển về trang chủ kèm thông báo lỗi
            return redirect('/')->with('error', 'Bạn không có quyền truy cập vùng này!');

            // Cách 2: Chuyển về một route có tên định danh (Named Route)
            // return redirect()->route('login')->with('message', 'Vui lòng đăng nhập');
        }

        return $next($request);
    }
}

/**
 * Mở src/routes/web.php:

Route::get('/admin-dashboard', function () {
    return "Chào mừng Admin!";
})->middleware('is_admin');

 * Mở src/bootstrap/app.php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'is_admin' => \SrcApp\Http\Middleware\CheckAdminMiddleware::class,
    ]);
})
 */

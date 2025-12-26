<?php
// example-app/src/routes/web.php
use Illuminate\Support\Facades\Route;
use SrcApp\Http\Controllers\TestController;
use SrcApp\Http\Controllers\Web\LoginController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/test', [TestController::class, 'index']);
Route::get('/learn', function() {
    return "Learn abc";
});

// admin
Route::view('/admin', 'custom::admin.dashboard')
    ->name('admin')
    ->middleware('auth');
Route::get('/login', [LoginController::class, 'index'])
    ->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])
    ->name('logout');

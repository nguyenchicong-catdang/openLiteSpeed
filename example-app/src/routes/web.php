<?php
// example-app/src/routes/web.php
use Illuminate\Support\Facades\Route;
use SrcApp\Controllers\TestController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test', [TestController::class, 'index']);
Route::get('/learn', function() {
    return "Learn abc";
});
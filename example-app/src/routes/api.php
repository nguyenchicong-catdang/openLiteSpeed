<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use SrcApp\Http\Controllers\Api\LoginController;


// tesst method
Route::get('/method-get', function() {
    return ['method' => 'get method'];
});
Route::post('/method-post', function () {
    return ['method' => 'post method'];
});

Route::post('/test-form', function (Request $request) {
    // Trả về toàn bộ dữ liệu nhận được để kiểm tra
    return response()->json([
        'method' => 'POST',
        'all_data' => $request->all(), // Cách của Laravel
        'raw_post' => $_POST          // Cách thuần PHP bạn muốn xem
    ]);
});


// Route::post('/login-api', [LoginController::class, 'login'])->middleware('web');
//Route::get('/login-api', [LoginController::class, 'login']);
Route::post('/login-api', [LoginController::class, 'login']);

// Route::get('/login-api', function() {
// return 'abc';
// });
Route::get('/check-auth', function (Request $request) {
    return 'test';
})->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/login', function() {
//     return response()->json([
//         'name' => 'Abigail',
//         'state' => 'CA',
//     ]);
// });



// Cách sửa chuẩn xác
Route::post('/login', function (Request $request) {
    return response()->json([
        'message' => 'Dữ liệu đã đến Laravel!',
        'received_data' => $request->all(),
    ]);
})->middleware('web');
// Route::post('/login', function (Request $request) {
//     return response()->json([
//         'message' => 'Dữ liệu đã đến Laravel!',
//         'received_data' => $request->all(),
//     ]);
// })->middleware('auth:sanctum');

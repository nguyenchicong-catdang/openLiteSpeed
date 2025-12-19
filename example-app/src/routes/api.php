<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

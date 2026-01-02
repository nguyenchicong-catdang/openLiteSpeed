<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AuthApiController;
//use App\Http\Controllers\LearnApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// learn login
//Route::get('/login', function() {return [403];})->name('login');
Route::get('/login', function () {
    return response()->noContent(403);
})->name('login');

Route::post('/login', [AuthApiController::class, 'login']);
// middleware('auth:sanctum)
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/check-auth', function() {return response('',201);});
    Route::get('/checkout', function () {
        return response()->json(['message' => 'Bạn đã vào trang thanh toán!']);
    });

    // posts
    Route::apiResource('posts', PostsController::class);
    // upload image
    Route::post('upload',[ImageController::class, 'upload']);
});

<?php
// routes/route-lean-api.php
// php artisan route:list --path=api
use Illuminate\Support\Facades\Route;
use SrcApp\Http\Controllers\LearApi\AuthLeanController;

// learn-api/learn-login
Route::get('/learn', function() {
    return 'abc';
});
// learn-api/learn-login
Route::get('/learn-login', [AuthLeanController::class, 'learnLogin']);

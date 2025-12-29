<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
// learn
Route::get('/learn', function() {
    return 'learn';
});

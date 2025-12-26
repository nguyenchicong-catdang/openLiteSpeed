<?php

namespace SrcApp\Http\Controllers\Api;

use Illuminate\Http\Request;
use SrcApp\Http\Requests\LoginRequest;
use SrcApp\Http\Controllers\Controller;

class LoginController extends Controller
{
    // public function login(LoginRequest $request) {
    //     $credentials = $request->validated();
    //     return response('succ');
    // }

    public function login() {
        return ['abc'];
    }
}

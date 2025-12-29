<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\AuthApiLoginRequest;

class AuthApiController extends Controller
{
    //
    public function login(AuthApiLoginRequest $requset) {
        // Log::debug("message");
        // return ['abc'];
        try {
            $credentials = $requset->validated();
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                /** @var \App\Models\User $user */ // Thêm dòng này để không báo đỏ
                //Log::debug("message: " . $user->createToken($user->username)->plainTextToken);
                // https://laravel.com/docs/12.x/sanctum#issuing-api-tokens
                $token = $user->createToken($user->username)->plainTextToken;

                return response()->json([
                    'status' => 'success',
                    //'username' => $user->username,
                    'token' => $token
                ],201);
            }
            return response()->json([
                'errors' => ['Tài khoản hoặc mật khẩu không đúng']
            ], 401);
        } catch (\Throwable $e) {
            Log::debug("message". $e);
            return response()->json($e);
        }
    }
}

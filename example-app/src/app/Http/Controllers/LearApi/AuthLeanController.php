<?php

namespace SrcApp\Http\Controllers\LearApi;

use SrcApp\Models\LearnApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use SrcApp\Http\Controllers\Controller;

class AuthLeanController extends Controller
{
    //
    public function learnLogin(Request $request) {
        // tìm user
        $user = LearnApi::where('username', $request->username)->first();
        // kiem tra mat khau
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Sai tài khoản hoặc mật khẩu'
            ]);
        }
        // tao token
        $token = $user->createToken('learn_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'key_token' => $token
        ]);
    }
}

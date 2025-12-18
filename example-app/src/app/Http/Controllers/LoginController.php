<?php

namespace SrcApp\Http\Controllers;

use Illuminate\Http\Request; // Nhớ dùng class này
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth; // Để xử lý đăng nhập
use Illuminate\Support\Facades\Log;  // Để ghi log nếu cần

class LoginController extends Controller
{
    public function index()
    {
        return view('custom::admin.login');
    }

    public function login(Request $request)
    {
        // 1. Validate dữ liệu đầu vào
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ], [
            // Sửa từ "username['required']" thành "username.required"
            'username.required' => 'Vui lòng nhập tên đăng nhập.',
            'username.string'   => 'Tên đăng nhập phải là một chuỗi ký tự.',
            'password.required' => 'Mật khẩu không được để trống.',
        ]);
        // dd($credentials);

        // 2. Xử lý logic đăng nhập qua Model User (mặc định)
        if (Auth::attempt($credentials)) {
            // Đăng nhập thành công, tạo lại session
            $request->session()->regenerate();

            Log::info("User {$credentials['username']} đã đăng nhập thành công.");
            dd('ok');
            return redirect()->intended('/dashboard');
        }

        // 3. Đăng nhập thất bại
        Log::warning("Đăng nhập thất bại cho tài khoản: " . $credentials['username']);
        return back()->withErrors([
            'username' => 'Thông tin đăng nhập không khớp với dữ liệu của chúng tôi.',
        ])->onlyInput('username');
    }
}

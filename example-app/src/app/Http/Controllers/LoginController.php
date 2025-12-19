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
        // 1. Validate dữ liệu
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ], [
            'username.required' => 'Vui lòng nhập tên đăng nhập.',
            'password.required' => 'Mật khẩu không được để trống.',
        ]);

        // 2. Xử lý đăng nhập
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            Log::info("User {$credentials['username']} đã đăng nhập thành công.");

            // TRẢ VỀ: Nếu là API trả về JSON, nếu là Web trả về Redirect
            if ($request->expectsJson()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Đăng nhập thành công',
                    'user' => Auth::user()
                ], 200);
            }

            return redirect()->intended(route('admin'));
        }

        // 3. Đăng nhập thất bại
        Log::warning("Đăng nhập thất bại cho tài khoản: " . $request->username);

        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Thông tin đăng nhập không khớp.'
            ], 401);
        }

        return back()->withErrors([
            'username' => 'Thông tin đăng nhập không khớp với dữ liệu của chúng tôi.',
        ])->onlyInput('username');
    }

    /**
     * Xử lý đăng xuất người dùng.
     */
    public function logout(Request $request)
    {
        // 1. Đăng xuất khỏi hệ thống
        Auth::logout();

        // 2. Vô hiệu hóa Session hiện tại để đảm bảo an toàn
        $request->session()->invalidate();

        // 3. Làm mới CSRF token để tránh tấn công giả mạo yêu cầu
        $request->session()->regenerateToken();

        // Ghi log nếu cần thiết
        Log::info("Người dùng đã đăng xuất.");

        // Chuyển hướng về trang chủ hoặc trang login
        return redirect('/');
    }
}

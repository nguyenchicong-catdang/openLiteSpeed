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

    public function login() {
        
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

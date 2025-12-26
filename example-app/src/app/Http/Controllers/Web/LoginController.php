<?php

namespace SrcApp\Http\Controllers\Web;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
//use App\Http\Controllers\Controller;
use SrcApp\Http\Controllers\Controller;
use SrcApp\Http\Requests\LoginRequest;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    //
    public function index() {

        return view('src::admin.login');
    }

    public function login(LoginRequest $request)
    {
        // try {
        //     $credentials = $request->validate([
        //         'username' => ['required', 'string'],
        //         'password' => ['required'],
        //     ]);

        //     // Logic login ở đây...

        // } catch (ValidationException $e) {
        //     // Cách A: Trả về JSON (Dùng cho API/Vue/React)
        //     return response()->json([
        //         'message' => 'Dữ liệu không hợp lệ',
        //         'errors' => $e->errors(), // Lấy danh sách lỗi
        //     ], 422);
        //     Log::error($e);
        //     // Cách B: Redirect kèm lỗi (Dùng cho Blade template truyền thống)
        //     // return back()->withErrors($e->errors())->withInput();
        // } catch (\Throwable $e) {
        //     Log::error($e);
        //     return response()->json(['message' => 'Lỗi hệ thống'], 500);
        // }
        $credentials = $request->validated();
        dd($credentials);
    }
}

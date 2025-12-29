<?php

namespace App\Http\Controllers;

use App\Models\LearnApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginLearnApiRequest;
use App\Http\Requests\StoreLearnApiRequest;
use App\Http\Requests\UpdateLearnApiRequest;

class LearnApiController extends Controller
{
    /**
     * login
     */

    public function login(LoginLearnApiRequest $request)
    {
        $validated = $request->validated();

        try {
            // Thực hiện kiểm tra trong DB
            //$result = Auth::guard('learn_api_auth')->attempt($validated);
            $result = Auth::attempt($validated);

            if ($result) {
                // ĐĂNG NHẬP ĐÚNG
                return response()->json([
                    'status' => 'success',
                    'message' => 'Login thành công'
                ], 200);
            }
            Log::error('Lỗi Login: '. $result);
            // ĐĂNG NHẬP SAI (User/Pass không khớp trong DB)
            return response()->json([
                'status' => 'error',
                'message' => 'Tài khoản hoặc mật khẩu không chính xác'
            ], 401); // Dùng 401 thay vì 410 để đúng chuẩn Auth

        } catch (\Throwable $e) {
            Log::error('Lỗi Login: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLearnApiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LearnApi $learnApi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LearnApi $learnApi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLearnApiRequest $request, LearnApi $learnApi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LearnApi $learnApi)
    {
        //
    }
}

<?php

namespace SrcApp\Http\Controllers;

// Đây là class gốc của Laravel cung cấp các trait như AuthorizesRequests, ValidatesRequests
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    // Tại đây bạn có thể thêm các thuộc tính dùng chung cho toàn bộ dự án
    // Ví dụ: protected $user;
}

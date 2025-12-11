<?php
// App/Core/AuthMiddleware.php
class AuthMiddleware {
    private $user;

    function __construct() {

    }

    public function setSessionUser($strUser) {
        $this->user = $strUser;
        return $_SESSION[$this->user] = true;
    }

    public function checkAuth(){
        if (!$_SESSION[$this->user]) {
            exit;
        }
    }

    public function destroySessionUser($strUser) {
        $this->user = $strUser;
        destroy($_SESSION[$this->user]);
    }
}
?>



<?php 
// App/Core/AuthMiddleware.php
// học code
class AuthMiddleware {
    
    // Tên khóa mặc định trong Session để lưu trạng thái đăng nhập
    private string $sessionKey; 

    public function __construct(string $sessionKey = 'is_logged_in') {
        // Đảm bảo session đã bắt đầu (Cần thiết trước khi dùng $_SESSION)
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $this->sessionKey = $sessionKey;
    }

    /**
     * Đánh dấu người dùng đã đăng nhập thành công.
     */
    public function setAuthSuccess() {
        $_SESSION[$this->sessionKey] = true;
    }

    /**
     * Kiểm tra xem người dùng đã đăng nhập hay chưa.
     * Nếu chưa, gửi phản hồi 401 và dừng script.
     */
    public function checkAuth() {
        // Kiểm tra xem khóa session có tồn tại và có giá trị TRUE
        if (!isset($_SESSION[$this->sessionKey]) || $_SESSION[$this->sessionKey] !== true) {
            // Gửi phản hồi lỗi 401
            http_response_code(401);
            header('Content-Type: application/json');
            echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Access denied.']);
            
            // Ngăn chặn truy cập vào Controller
            exit; 
        }
        // Nếu đã đăng nhập, code tiếp tục chạy
    }

    /**
     * Đăng xuất/Hủy trạng thái đăng nhập.
     */
    public function destroyAuth() {
        // Xóa khóa session cụ thể
        unset($_SESSION[$this->sessionKey]); 
        
        // Tùy chọn: Xóa toàn bộ dữ liệu session
        // $_SESSION = [];
        // session_destroy(); 
    }
}
?>
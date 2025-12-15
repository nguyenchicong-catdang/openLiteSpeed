<?php 
// App/Core/Database.php

class Database {
    // 1. Khai báo biến static để giữ thể hiện duy nhất
    private static $instance = null;
    
    // 2. Biến chứa kết nối PDO
    private $conn;

    // Ngăn chặn việc khởi tạo trực tiếp bên ngoài
    private function __construct() {
        // Lệnh require_once chỉ cần chạy 1 lần khi class này được tải
        require_once __DIR__ . "/config.php"; 
        
        // Tạo chuỗi DSN (Giả sử $dsn, $username, $password được định nghĩa trong config.php)
        // Nếu config.php chỉ chứa mảng $mysql, bạn cần tạo $dsn tại đây:
        // $dsn = "mysql:host=" . $mysql['servername'] . ";dbname=" . $mysql['dbname'];
        
        // Gắn các biến từ config.php vào đây để ví dụ minh họa
        global $dsn, $username, $password; // CẦN ĐẢM BẢO config.php KHAI BÁO global HOẶC CHUYỂN DSN VÀO ĐÂY
        
        try {
            $this->conn = new PDO($dsn, $username, $password); 
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Bạn không nên echo "Connected successfully" trong constructor của API
             echo "Connected successfully"; 
        } catch(PDOException $e) {
            // Nên ghi log lỗi thay vì chỉ echo, sau đó dừng ứng dụng
            die("Connection failed: " . $e->getMessage()); 
        }
    }
    
    // Ngăn chặn việc clone (nhân bản)
    private function __clone() {}
    
    // Ngăn chặn việc unserialize (khôi phục từ chuỗi)
    public function __wakeup() {}
    
    // 3. Phương thức static duy nhất để lấy instance
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    // 4. Phương thức để lấy kết nối PDO
    public function getConnection() {
        return $this->conn;
    }
}
// 
?>
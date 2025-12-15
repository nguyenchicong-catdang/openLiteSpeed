<?php 
// App/Core/Database.php

class Database {
    private static $instance = null;
    private $conn;

    // Thay đổi constructor để nhận mảng cấu hình
    private function __construct(array $config) {
        
        // 1. Tạo DSN từ mảng cấu hình được truyền vào
        $dsn = "{$config['servername']}:host={$config['host']};dbname={$config['dbname']}";
        $username = $config['username'];
        $password = $config['password'];

        try {
            $this->conn = new PDO($dsn, $username, $password); 
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connected successfully"; 
        } catch(PDOException $e) {
            die("Connection failed: " . $e->getMessage()); 
        }
    }
    
    // Ngăn chặn việc clone và unserialize
    private function __clone() {}
    public function __wakeup() {
        throw new \Exception("Cannot unserialize a singleton.");
    }
    
    // Phương thức static nhận cấu hình khi gọi lần đầu
    public static function getInstance(array $config = []) {
        // Chỉ khởi tạo nếu chưa có
        if (self::$instance == null) {
            // Đảm bảo cấu hình được truyền vào lần đầu tiên
            if (empty($config)) {
                throw new \Exception("Database configuration must be provided the first time.");
            }
            self::$instance = new Database($config);
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->conn;
    }
}
?>
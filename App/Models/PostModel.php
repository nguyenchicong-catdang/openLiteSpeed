<?php
//App/Models/PostModel.php
class PostModel {
    // Xóa private $pdo;
    
    // Đã thay $this->pdo bằng $pdo cục bộ
    public function fetchAll(Database $conn) {
        try {
            // Lấy kết nối PDO
            $pdo = $conn->getConnection(); 
            
            $sql = "SELECT id, title, content FROM posts";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            // Sửa lỗi: Sử dụng fetchAll() để lấy dữ liệu
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            error_log($e);
            // Xử lý lỗi PDO an toàn hơn cho môi trường API
            http_response_code(500);
            header("Content-Type: application/json");
            echo json_encode(["error" => "Database error.", "details" => $e->getMessage()]);
            exit;
        } catch (Exception $e) {
             error_log($e);
             http_response_code(500);
             header("Content-Type: application/json");
             echo json_encode(["error" => "Server error.", "details" => $e->getMessage()]);
             exit;
        }
    }
}
?>
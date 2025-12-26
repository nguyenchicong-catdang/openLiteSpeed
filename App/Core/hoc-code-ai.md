Chào bạn, để viết lại Router và thể hiện việc **tiêm (Inject) PDO** vào Model (cụ thể là `PostModel`) một cách linh hoạt, chúng ta cần thay đổi cách khởi tạo đối tượng trong `RouterApi.php`.

Ý tưởng là:

1.  **Sử dụng Database Singleton** để lấy đối tượng PDO.
2.  **Khởi tạo `PostModel`** bằng cách truyền đối tượng PDO vào constructor của nó (Dependency Injection).
3.  **Khởi tạo `PostController`** bằng cách truyền `PostModel` đã được tiêm (hoặc chỉ Model nếu Controller không cần xử lý DB trực tiếp).

Dưới đây là phiên bản tối ưu của file `App/Core/RouterApi.php`, tập trung vào việc tiêm PDO vào `PostModel` và chuẩn bị cho việc tiêm Redis sau này.

## 🛠️ `App/Core/RouterApi.php` (Phiên bản Tối ưu với Dependency Injection)

```php
<?php 
// App/Core/RouterApi.php

// KHUYẾN NGHỊ: Thay thế tất cả các require_once này bằng Composer Autoloading cho kiến trúc lớn
require_once __DIR__ . "/../Controllers/LoginController.php";
require_once __DIR__ . "/../Models/LoginModel.php";
require_once __DIR__ . "/AuthMiddleware.php";
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/Database.php"; // Chứa class Database Singleton
require_once __DIR__ . "/../Controllers/PostController.php";
require_once __DIR__ . "/../Models/PostModel.php";

// --- 1. KHỞI TẠO CORE DEPENDENCIES ---

// Khởi tạo Database Singleton và lấy đối tượng PDO
// $sql được định nghĩa trong App/Core/config.php
$dbInstance = Database::getInstance($sql); 
$pdo = $dbInstance->getConnection(); // Lấy đối tượng PDO thuần túy

// LƯU Ý: Nếu bạn có Redis, bạn sẽ khởi tạo Redis Client tại đây:
// $redis = new Redis();
// $redis->connect('redis_host', 6379);

// --- 2. KHỞI TẠO MODELS VÀ CONTROLLERS (ÁP DỤNG DEPENDENCY INJECTION) ---

// *********** DI cho PostModel ***********
// Tiêm PDO vào PostModel (Giả sử bạn chưa tích hợp Redis)
// Tối ưu: Nếu đã tích hợp Redis, bạn sẽ truyền cả $pdo và $redis vào constructor
$instancePostModel = new PostModel($pdo); 

// Tiêm PostModel đã được khởi tạo vào PostController (DI từ tầng trên)
$instancePostController = new PostController($instancePostModel);


// *********** Khởi tạo các Controllers khác ***********
// Giả định LoginController/Model cũng được tiêm PDO nếu cần
$instanceLoginModel = new LoginModel($pdo); 
$instanceAuthMiddleware = new AuthMiddleware();
$instanceLoginController = new LoginController($instanceLoginModel, $instanceAuthMiddleware);


// --- 3. ĐỊNH TUYẾN YÊU CẦU ---

$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url, PHP_URL_PATH);
$path = rtrim($path, '/'); // Chuẩn hóa đường dẫn

switch($path) {
    case '/api/login': 
        // Thay đổi: $instanceLoginController không cần truyền model và middleware thủ công nữa 
        // nếu đã được tiêm qua constructor.
        $instanceLoginController->login();
        break;
    case '/api/logout':
        $instanceLoginController->logout();
        break;
    case '/api/check-auth': 
        $instanceAuthMiddleware->checkAuth();
        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode(["message" => "Authenticated"]);
        exit;
        break;
    case '/api/post/list':
        // Thay đổi: Controller đã có Model, chỉ cần gọi phương thức
        $instancePostController->fetchAll(); 
        break;
    default:
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(["error" => "Not Found"]);
        break;
}
?>
```

## 📝 Các Thay đổi đi kèm

Để Router hoạt động, bạn cần cập nhật cách nhận Dependency trong các lớp liên quan:

### 1\. Cập nhật `PostModel` (đã tiêm PDO)

```php
// App/Models/PostModel.php
class PostModel {
    private $pdo;
    
    // Yêu cầu PDO trong constructor
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function fetchAll(): array {
        try {
            // Sử dụng $this->pdo đã được tiêm
            $sql = "SELECT id, title, content FROM posts";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            // ... (Giữ nguyên phần xử lý lỗi)
        }
    }
}
```

### 2\. Cập nhật `PostController` (đã tiêm PostModel)

```php
// App/Controllers/PostController.php
class PostController {
    private $postModel;

    // Yêu cầu PostModel trong constructor
    public function __construct(PostModel $postModel) {
        $this->postModel = $postModel;
    }

    // Không cần tham số Database $conn và PostModel $instance nữa
    public function fetchAll() {
       // Gọi Model qua $this->postModel đã được tiêm
       $result = $this->postModel->fetchAll();
       
       http_response_code(200);
       header("Content-Type: application/json");
       echo json_encode($result);
       exit;
    }
}
```

## 🌟 Nhận xét về Lợi ích của Dependency Injection (DI)

Việc viết lại Router theo hướng DI mang lại các lợi ích sau:

  * **Tính Tách biệt Cao:** `PostController` không cần biết cách khởi tạo `PostModel`, và `PostModel` không cần biết cách khởi tạo kết nối DB; nó chỉ cần nhận đối tượng PDO/Redis sẵn có. Điều này giúp lớp chỉ tập trung vào nghiệp vụ của mình.
  * **Dễ Dàng Mở Rộng (Redis):** Khi bạn muốn tích hợp Redis, bạn chỉ cần sửa **một nơi duy nhất** là `RouterApi.php` (hoặc tầng Service Container nếu có) để khởi tạo `PostModel` với cả PDO và Redis Client, mà không cần thay đổi code của `PostController`.
  * **Dễ Dàng Unit Test:** Khi kiểm thử `PostController`, bạn có thể tiêm một đối tượng `PostModel` giả lập (Mocking) thay vì đối tượng thật sự, và khi kiểm thử `PostModel`, bạn tiêm một đối tượng PDO giả lập.

-----

Việc tối ưu này đã đưa cấu trúc của bạn tiến gần hơn đến chuẩn mực của các framework MVC hiện đại như Laravel hay Symfony.

Bạn muốn tôi viết code mẫu để tích hợp **Redis Client** vào `PostModel` và `RouterApi.php` như đã đề xuất không?
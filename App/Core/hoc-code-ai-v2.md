Chào bạn, yêu cầu của bạn là nâng cấp phần định tuyến (routing) từ cấu trúc `switch/case` trong `RouterApi.php` thành một class `Router` cơ bản, đồng thời tích hợp cơ chế tiêm PDO và Redis vào các Controller/Model thông qua class Router này.

Dưới đây là một cách triển khai class `Router` cơ bản, sử dụng mô hình **Service Locator/Simple Container** (được tích hợp ngay trong Router) để quản lý các dependencies (PDO, Redis).

## 1\. 🏗️ Tạo Class `Router` Cơ Bản (`App/Core/Router.php`)

Class `Router` này sẽ chịu trách nhiệm:

1.  Lưu trữ các **Dependencies** (PDO, Redis).
2.  Lưu trữ các **Định tuyến** (Routes).
3.  **Xử lý yêu cầu** và gọi Controller/Method tương ứng.

<!-- end list -->

```php
<?php
// App/Core/Router.php

class Router {
    private array $routes = [];
    private array $dependencies = [];

    // 1. Thêm Dependency (PDO, Redis) vào Container nội bộ
    public function registerDependency(string $key, $service): void {
        $this->dependencies[$key] = $service;
    }

    // 2. Thêm Route (Chỉ hỗ trợ GET đơn giản cho ví dụ này)
    public function get(string $uri, string $controller, string $method): void {
        $this->routes['GET'][$uri] = [
            'controller' => $controller,
            'method' => $method
        ];
    }

    // 3. Xử lý yêu cầu và Tiêm Dependencies
    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $path = rtrim($path, '/');
        
        $currentRoutes = $this->routes[$method] ?? [];

        if (array_key_exists($path, $currentRoutes)) {
            $route = $currentRoutes[$path];
            $controllerClass = $route['controller'];
            $methodName = $route['method'];

            // --- QUAN TRỌNG: Cơ chế Tiêm (Injection) ---
            
            // Khởi tạo Model (Nơi cần PDO và Redis)
            // Trong ví dụ này, Router tự biết cách khởi tạo Model
            
            // 1. Lấy Dependencies cần thiết từ container nội bộ
            $pdo = $this->dependencies['pdo'] ?? null;
            $redis = $this->dependencies['redis'] ?? null;
            
            if ($controllerClass === 'PostController') {
                // Khởi tạo PostModel với PDO và Redis (nếu có)
                if ($pdo === null) {
                    throw new \Exception("Database (PDO) dependency is missing.");
                }
                
                // Tiêm PDO và Redis vào PostModel
                $postModel = new PostModel($pdo, $redis); 
                
                // Tiêm PostModel vào PostController
                $controllerInstance = new $controllerClass($postModel);
                
            } elseif ($controllerClass === 'LoginController') {
                // Giả định LoginController cần LoginModel, AuthMiddleware
                $loginModel = new LoginModel($pdo);
                $authMiddleware = new AuthMiddleware();
                $controllerInstance = new $controllerClass($loginModel, $authMiddleware);
            
            } else {
                // Khởi tạo Controller mặc định nếu không có dependency phức tạp
                $controllerInstance = new $controllerClass();
            }
            
            // Gọi phương thức của Controller
            $controllerInstance->{$methodName}();
            
        } else {
            http_response_code(404);
            header("Content-Type: application/json");
            echo json_encode(["error" => "Route not found"]);
        }
    }
}
```

## 2\. 🔄 Cập nhật `PostModel` (để nhận PDO & Redis)

Bạn cần sửa `PostModel` để constructor nhận cả hai dependencies này.

```php
<?php
// App/Models/PostModel.php

class PostModel {
    private $pdo;
    private $redis; // Có thể null nếu Redis không được tiêm

    // Constructor nhận PDO và Redis Client
    public function __construct(PDO $pdo, ?Redis $redis = null) {
        $this->pdo = $pdo;
        $this->redis = $redis; 
    }

    public function fetchAll(): array {
        $cacheKey = 'posts:all'; 

        // 1. Kiểm tra Cache (chỉ khi có Redis)
        if ($this->redis) {
            $cachedResult = $this->redis->get($cacheKey);
            if ($cachedResult !== false) {
                return json_decode($cachedResult, true); 
            }
        }

        // 2. Truy vấn DB
        try {
            $sql = "SELECT id, title, content FROM posts";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // 3. Lưu Cache (chỉ khi có Redis)
            if ($this->redis) {
                $this->redis->set($cacheKey, json_encode($result), 600); // Cache 10 phút
            }
            
            return $result;
        } catch (\PDOException $e) {
            // ... Xử lý lỗi
            throw $e;
        }
    }
}
```

## 3\. 🌐 Cập nhật `RouterApi.php` (File chính)

Đây là file sẽ khởi tạo Router và các dependencies, sau đó định tuyến.

```php
<?php 
// App/Core/RouterApi.php (File chính để khởi chạy ứng dụng)

// KHUYẾN NGHỊ: Sử dụng Composer Autoloading thay vì require_once
require_once __DIR__ . "/../Controllers/LoginController.php";
require_once __DIR__ . "/../Models/LoginModel.php";
require_once __DIR__ . "/AuthMiddleware.php";
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/Database.php"; 
require_once __DIR__ . "/../Controllers/PostController.php";
require_once __DIR__ . "/../Models/PostModel.php";
require_once __DIR__ . "/Router.php"; // Thêm class Router mới

// --- 1. KHỞI TẠO CORE DEPENDENCIES ---

// Khởi tạo Database và lấy PDO
$dbInstance = Database::getInstance($sql); 
$pdo = $dbInstance->getConnection(); 

// Khởi tạo Redis Client (Giả sử bạn đã cài extension phpredis)
$redis = null;
try {
    $redis = new Redis();
    // Thay đổi host/port nếu cần
    $redis->connect('127.0.0.1', 6379); 
} catch (\RedisException $e) {
    // Nếu Redis Server không chạy, Redis Client sẽ là null.
    // Xử lý lỗi hoặc ghi log nếu kết nối Redis thất bại
    error_log("Redis connection failed: " . $e->getMessage());
    $redis = null; // Gán lại $redis = null để Model xử lý việc không có cache
}


// --- 2. KHỞI TẠO ROUTER VÀ ĐĂNG KÝ DEPENDENCIES ---

$router = new Router();

// Đăng ký PDO và Redis vào Router Container
$router->registerDependency('pdo', $pdo); 
$router->registerDependency('redis', $redis);


// --- 3. ĐĂNG KÝ CÁC ROUTE (Ánh xạ URI tới Controller/Method) ---

$router->get('/api/login', 'LoginController', 'login');
$router->get('/api/logout', 'LoginController', 'logout');
// Lưu ý: check-auth nên được xử lý trong Middleware/Controller
$router->get('/api/check-auth', 'AuthMiddleware', 'checkAuth'); 
$router->get('/api/post/list', 'PostController', 'fetchAll'); 


// --- 4. CHẠY ROUTER ---

$router->dispatch();
?>
```

Với cấu trúc mới này, bạn đã đạt được mục tiêu:

1.  **Sử dụng Class `Router`** thay vì `switch/case`.
2.  **Tiêm PDO và Redis** vào `PostModel` một cách linh hoạt thông qua logic khởi tạo trong phương thức `dispatch()` của `Router`.
3.  `PostModel` tự xử lý logic **Cache-Aside** (kiểm tra Redis trước khi truy vấn DB).
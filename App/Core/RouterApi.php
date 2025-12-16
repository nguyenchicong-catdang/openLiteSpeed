<?php 
// App/Core/RouterApi.php
//session_start();
// App/Controllers/LoginController.php
require_once __DIR__ . "/../Controllers/LoginController.php";
// App/Models/LoginModel.php
require_once __DIR__ . "/../Models/LoginModel.php";
// App/Core/AuthMiddleware.php
require_once __DIR__ . "/AuthMiddleware.php";
// App/Core/config.php
require_once __DIR__ . "/config.php";
// App/Core/Database.php
require_once __DIR__ . "/Database.php";

// App/Controllers/PostController.php
require_once __DIR__ . "/../Controllers/PostController.php";
// App/Models/PostModel.php
require_once __DIR__ . "/../Models/PostModel.php";

$instanceLoginController = new LoginController;
$instanceLoginModel = new LoginModel;
$instanceAuthMiddleware = new AuthMiddleware;

$instancePostController = new PostController;
$instancePostModel = new PostModel;

// 2. Tối ưu: Truyền mảng cấu hình $sql vào getInstance()
// Database Singleton chỉ được tạo 1 lần.
$conn = Database::getInstance($sql); 
//$pdo = $conn->getConnection(); // Lấy đối tượng PDO


$url = $_SERVER['REQUEST_URI'];

// FIX: Use parse_url to get only the path and trim trailing slashes
// This ensures /api/login and /api/login/ are treated the same
$path = parse_url($url, PHP_URL_PATH);
$path = rtrim($path, '/'); // Remove trailing slash

// Use a simple rewrite to correct the API endpoint structure
if (strpos($path, '/api') === 0) {
    // Keep the path as is if it starts with /api
} else {
    // If running in a subdirectory, you might need to manually strip the base path
    // For now, let's assume your requests are hitting the /api endpoint correctly
}

// Now, compare against the cleaned path:
switch($path) {
    case '/api/login': // Removed the trailing slash from the case
        $instanceLoginController->login($instanceLoginModel, $instanceAuthMiddleware);
        break;
    case '/api/logout':
        $instanceLoginController->logout($instanceAuthMiddleware);
        break;
    case '/api/check-auth': // Removed the trailing slash from the case
        $instanceAuthMiddleware->checkAuth();
        // The checkAuth method already handles http_response_code(401) and exit.
        // If execution continues past checkAuth, it means the user is logged in.
        // You should add code here to return a success status or user data.
        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode(["message" => "Authenticated"]);
        exit;
        break;
    case '/api/post/list':
        $instancePostController->fetchAll($conn, $instancePostModel);
        break;
    default:
        http_response_code(404);
}
?>
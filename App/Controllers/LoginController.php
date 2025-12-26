<?php 
// App/Controllers/LoginController.php
class LoginController {
    // ... constructor ...

    public function login(LoginModel $instanceLoginModel, AuthMiddleware $instanceAuthMiddleware): void {
        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            
            // --- NEW: Handle JSON input ---
            $inputData = [];
            $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
            
            if ($contentType === 'application/json') {
                // Read the raw JSON data from the request body
                $content = file_get_contents("php://input");
                $inputData = json_decode($content, true);
            } else {
                // Fallback to standard $_POST data
                $inputData = $_POST;
            }

            $username = $inputData['username'] ?? null; // Use null coalescing operator
            $password = $inputData['password'] ?? null;
            // --- END NEW ---

            // Basic check for required fields
            if (!$username || !$password) {
                 http_response_code(400); // 400 Bad Request
                 header("Content-Type: application/json");
                 echo json_encode(["error" => "Missing username or password"]);
                 exit;
            }

            // validate
            $result = $instanceLoginModel->validateLogin($username, $password);
            if ($result) {
                $instanceAuthMiddleware->setSessionUser($username);
                // Correct status code for successful creation of a session/resource is often 200 or 201
                http_response_code(200); // 200 OK for successful login/session establishment
                header("Content-Type: application/json");
                echo json_encode(["success" => true, "user" => $username]); // Return success status
                exit;
            }

            http_response_code(401); // 401 Unauthorized for failed login
            header("Content-Type: application/json");
            echo json_encode(["error" => "Invalid credentials"]);
            exit;
        }

        http_response_code(405); // 405 Method Not Allowed if not POST
        exit;
    }

    public function logout(AuthMiddleware $instanceAuthMiddleware): void {
        $instanceAuthMiddleware-> destroySessionUser();
        http_response_code(201);
        header('Location: /login/');
        exit;
    }
}
?>
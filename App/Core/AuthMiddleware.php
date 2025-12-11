<?php
// App/Core/AuthMiddleware.php
class AuthMiddleware {
    // FIX: Corrected typo and renamed for clarity
    private $currentUserKey = "current_user";

    function __construct() {
        // Good practice to check status before starting session
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function setSessionUser(string $strUser): void {
        // Set the session variable using the correct key
        $_SESSION[$this->currentUserKey] = $strUser;
    }

    // FIX: Corrected logic to check if a user is truly logged in
    public function isUserLogin(): bool {
        // Returns true only if the session variable is set and NOT empty
        return !empty($_SESSION[$this->currentUserKey]);
    }

    public function checkAuth($redirecRoute = "/login/"): void {
        if (!$this->isUserLogin()) {
            http_response_code(401);
            // Optionally redirect to a login page instead of just exiting
            //header('Location: /login/');
            //header("Location: $redirecRoute");
            exit; 
        }
    }

    // FIX: Removed incorrect 'destroy' and used 'unset'
    // This function is now designed to destroy the *current* logged-in user session
    public function destroySessionUser(): void {
        if (isset($_SESSION[$this->currentUserKey])) {
            unset($_SESSION[$this->currentUserKey]);
        }
        // If you want to log the user out entirely, you might also use session_destroy() here.
    }
}
?>
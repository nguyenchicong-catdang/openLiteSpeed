<?php 
// App/Core/Database.php
class Database {
    private $conn;
    public function __construct() {
        //App/Core/config.php
        require_once __DIR__ . "/config.php";
        try {
            $this->conn = new PDO($dsn, $username, $password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully";
        } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        }
    }
}
?>
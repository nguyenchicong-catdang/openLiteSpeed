<?php 
// App/Controllers/PostController.php
class PostController {

    public function fetchAll(Database $conn, PostModel $instance) {
       $result = $instance->fetchAll($conn);
       http_response_code(200);
       header("Content-Type: application/json");
       echo json_encode($result);
       exit;
    }
}
?>
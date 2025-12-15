<?php 
// App/Core/config.php
$sql = [
    'servername' => 'mysql', // Cần đổi thành 'mysql' nếu đang dùng tên service trong Docker, hoặc giữ nguyên 'mysql'
    'host' => 'localhost',
    'username' => 'learn',
    'password' => 'Learn@01',
    'dbname' => 'learn'
];
// Bỏ hết các dòng tạo $dsn, $username, $password, và khối try/catch
?>
<?php 
// App/Core/config.php
$sql = [
    'servername' => 'mysql',
    'host' => 'localhost',
    'username' => 'learn',
    'password' => 'Learn@01',
    'dbname' => 'learn'
];
// $conn = new PDO(DSN_string, username_string, password_string);
// $conn = new PDO("mysql:host=$servername;dbname=myDB", $username, $password);
$dsn = "{$sql['servername']}:host={$sql['host']};dbname={$sql['dbname']}";
$username = $sql['username'];
$password = $sql['password'];
// error_log(var_dump($dsn));
// try {
//     $conn = new PDO($dsn, $username, $password);

//   // set the PDO error mode to exception
//   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//   echo "Connected successfully";
// } catch(PDOException $e) {
//   echo "Connection failed: " . $e->getMessage();
// }
?>
<?php 
// php-cli.php
// docroot = php -t
$docroot = "App/public";
// Lấy đường dẫn request
$uri = $_SERVER['REQUEST_URI'];
$url_path = parse_url($uri, PHP_URL_PATH);
$url_query = parse_url($uri, PHP_URL_QUERY);
// __DIR__
//$cwd = getcwd();
//echo $cwd;


// req file
$requested_file = __DIR__ . "/". $docroot . $url_path;

// xu ly 500 -> /favicon.ico
if (str_contains($requested_file, "favicon.ico")) {
    return readfile($requested_file . "/favicon.ico");
}
// xu ly req file tĩnh
if (file_exists($requested_file) && !is_dir($requested_file)) {
    //echo "cos file: ";
    // tra ve fale de may chu xu ly file tinh
    //chdir($docroot);
    //return false;
    //echo $docroot;
    return readfile($requested_file);
}
    //return readfile($requested_file);
// } else {
//     require $docroot . '/index.php';
// }

// xử lý các yêu cầu không phải file, không phải thư mục
// if (is_dir($requested_file)) {
//     echo dirname($requested_file);
// };
//echo $requested_file;
//require $docroot . '/index.php';
require $docroot . $url_path . '/index.php';
//echo $url_path;
//echo "<br>";
//echo $url_query;
//echo $requested_file;
?>
# php -S host:port -t docroot
php -S localhost:9000 php-cli.php
# hàm cơ bản
## uri
$uri = $_SERVER['REQUEST_URI'];
## path
$url_path = parse_url($uri, PHP_URL_PATH);
## query
$url_query = parse_url($uri, PHP_URL_QUERY);
## thao khảo
 $cwd = getcwd();
## str_contains -> favico.ico -->> readfile
if (str_contains($requested_file, "favicon.ico")) {
    return readfile($requested_file . "/favicon.ico");
}
## file_exists -> !is_dir (không phải thư mục)
if (file_exists($requested_file) && !is_dir($requested_file)) {
    return readfile($requested_file);
}
## tra vè index
require $docroot . $url_path . '/index.php';

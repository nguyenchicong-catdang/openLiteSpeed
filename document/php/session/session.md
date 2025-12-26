## Cách session_status() hoạt động
Hàm session_status() trả về một trong ba hằng số sau:Hằng sốGiá trị

Ý nghĩaPHP_SESSION_NONE 1 Session chưa được kích hoạt.

PHP_SESSION_ACTIVE 2 Session đã được kích hoạt và có thể truy cập $_SESSION.

PHP_SESSION_DISABLED 0 Session bị vô hiệu hóa trong file php.ini.

```bash
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
```
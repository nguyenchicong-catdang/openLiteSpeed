# Xóa cache của file cấu hình (.env, config/*.php)
php artisan config:clear

# Xóa cache của Routes
php artisan route:clear

# Xóa cache của Views (các file Blade đã compile)
php artisan view:clear

# Xóa cache ứng dụng (dữ liệu bạn tự lưu vào cache)
php artisan cache:clear

# Xóa các file log cũ để gọn nhẹ dự án (không bắt buộc)
truncate -s 0 storage/logs/laravel.log

# xoa het
php artisan optimize:clear
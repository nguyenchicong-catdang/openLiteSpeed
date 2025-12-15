# mysql-server
sudo apt install mysql-server
# run
sudo mysql_secure_installation
# mysql
sudo service mysql start

sudo service mysql restart
## version 
mysql --version
# run
sudo mysql
# xem user
SELECT user, host FROM mysql.user;
# xem data base
SHOW DATABASES;
# su dung database
USE mysql;
# xom bang
SHOW TABLES;
# xem cau trúc bảng
DESCRIBE ten_bang;
-- hoặc viết tắt:
DESC ten_bang;
# Tạo Tài Khoản Người Dùng Mới
sudo mysql

// note pass 8 chữ số, chữ hoa, chữ thường, ký tự đặc biệt, số
CREATE USER 'learn'@'localhost' IDENTIFIED BY 'Learn@01';
# Cấp quyền trên database 'learn'
GRANT ALL PRIVILEGES ON learn.* TO 'learn'@'localhost';
# Áp dụng thay đổi

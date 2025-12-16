## v1
composer global require laravel/installer
## fix
### Xác định thư mục Vendor Bin của Composer
composer global config bin-dir --absolute
### Thêm đường dẫn vào $PATH
nano ~/.bashrc
### add path
export PATH="$PATH:$HOME/.config/composer/vendor/bin"
### Cập nhật thay đổi cho session hiện tại:
source ~/.bashrc
### test
laravel -v
## up php
sudo apt install php-xml
## cai dat php8.3-mysql
sudo apt install php8.3-mysql
## cai dat (php-xml)-> bao loi
laravel new example-app

cd example-app

composer update

## tao .env ket noi db
dien du thong tin 
# chay ket noi db
php artisan migrate
# chay key:generate
php artisan key:generate
# clear config
php artisan config:clear
## test
php artisan serve

composer run dev

### tham khao cap quyen
sudo chmod -R 775 storage

sudo chmod -R 775 bootstrap/cache



## cai dat data base
CREATE DATABASE learn_laravel;

## cap quyen learn
GRANT ALL PRIVILEGES ON learn_laravel.* TO 'learn'@'localhost';

FLUSH PRIVILEGES;
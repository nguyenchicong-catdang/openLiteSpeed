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

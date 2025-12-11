# alias

## 1
nano ~/.bashrc
Hoặc vi ~/.bashrc

## Alias cho việc gọi PHP từ OpenLiteSpeed
alias lsphp='/usr/local/lsws/lsphp81/bin/php'

## Alias cho Composer sử dụng PHP của OpenLiteSpeed
alias lscomposer='lsphp /path/to/your/project/composer.phar'

Thay '/path/to/your/project/' bằng đường dẫn thực tế đến composer.phar của bạn

## Áp dụng thay đổi:
source ~/.bashrc

### So sánh với PowerShell
Cơ chế này tương tự như việc tạo Alias vĩnh viễn trong PowerShell. Trong PowerShell, bạn cũng phải thêm lệnh Set-Alias vào tệp Profile của PowerShell (thường nằm ở $PROFILE) để lệnh đó tồn tại sau khi bạn đóng cửa sổ PowerShell.
# ~/scripts/learn-api.sh
```bash
nano ~/scripts/learn-api.sh
```
# Cài đặt công cụ hỗ trợ expect
```bash
#!/usr/bin/expect -f

# Tự động chạy cụm lệnh bash bên trong môi trường expect
spawn bash -c "cd ~ && ls; exec bash"

# Giữ tương tác để bạn có thể tiếp tục gõ lệnh
interact
```
# run window terminal
```bash
wsl.exe -d Ubuntu-24.04 -e expect ~/scripts/learn-api.sh
```
## expect v2
```bash
#!/usr/bin/expect -f

set pass "your pass"
set timeout 10

# 1. Khởi động bash
spawn bash

# 2. Đợi bash sẵn sàng
expect "$ "

# 3. Gửi lệnh (Sửa lại: CD trước, sau đó sudo LS)
send "cd ~/openLiteSpeed\r"
# 2. Đợi bash sẵn sàng
expect "$ "
# send "sudo killall -9 php8.3\r"
# Đúng: dùng send, dấu ngoặc kép bao quanh lệnh, lệnh kết thúc bằng \r
send "sudo pkill -9 -f 'php|artisan|composer|node'\r"
# 4. Xử lý mật khẩu sudo
expect {
    "password for*" {
        send "$pass\r"
        exp_continue
    }
    # Sau khi nhập xong hoặc nếu không hỏi mật khẩu, đợi dấu nhắc lệnh tiếp theo
    "$ "
}

# 5. Giữ tương tác để bạn tiếp tục làm việc
interact
```

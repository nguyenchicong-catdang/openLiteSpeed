# Kết nối FTP/SFTP với WSL
Chào bạn,

Việc kết nối FTP (File Transfer Protocol) trực tiếp tới WSL (Windows Subsystem for Linux) hoặc một ứng dụng chạy trong WSL (như OpenLiteSpeed) có thể gặp một số vấn đề về mạng do cách WSL hoạt động (đặc biệt là WSL 2).

Phương pháp được khuyến nghị và phổ biến nhất để truyền file giữa Windows và WSL là sử dụng **SFTP (SSH File Transfer Protocol)**, một giao thức an toàn hơn và hoạt động tốt hơn với kiến trúc mạng của WSL.

Dưới đây là các bước tổng quát để kết nối:

## 1\. Sử dụng SFTP (Cách được khuyến nghị)

SFTP sử dụng giao thức SSH để truyền file.

### Cài đặt và Cấu hình SSH Server trong WSL

1.  **Mở WSL/Ubuntu terminal.**
2.  **Cài đặt OpenSSH Server:**
    ```bash
    sudo apt update
    sudo apt install openssh-server -y
    ```
3.  **Cấu hình SSH (tùy chọn nhưng khuyến nghị):** Bạn có thể chỉnh sửa file cấu hình để cho phép đăng nhập bằng mật khẩu (nếu bạn chưa thiết lập key SSH).
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```
    Tìm và đảm bảo các dòng sau được đặt (hoặc thêm vào):
    ```
    Port 22 # Hoặc một cổng khác nếu muốn
    ListenAddress 0.0.0.0
    PasswordAuthentication yes
    ```
    Sau đó, lưu và thoát (Ctrl+O, Enter, Ctrl+X trong `nano`).
4.  **Khởi động lại dịch vụ SSH:**
    ```bash
    sudo service ssh restart
    ```
5.  **Tìm địa chỉ IP của WSL:**
    ```bash
    hostname -I
    ```
    Ghi lại địa chỉ IP này (thường bắt đầu bằng `172.`).

### Cấu hình Windows Firewall (Cho WSL 2)

Vì WSL 2 chạy trên một máy ảo riêng biệt có địa chỉ IP động, bạn cần mở cổng (mặc định là 22) trong Windows Firewall để cho phép kết nối đến IP của WSL:

1.  **Mở Windows Defender Firewall with Advanced Security** (Tìm kiếm `wf.msc` trong Start Menu).
2.  **Tạo New Inbound Rule...**
3.  Chọn **Port**, sau đó chọn **TCP** và nhập cổng đã dùng (mặc định là `22`).
4.  Chọn **Allow the connection**.
5.  Chọn hồ sơ mạng (**Domain**, **Private**, **Public** - chọn **Private** là đủ cho mạng gia đình/văn phòng).
6.  Đặt tên cho Rule (ví dụ: `WSL SSH Access`).

### Kết nối bằng SFTP Client

Sử dụng một FTP/SFTP client như **FileZilla** hoặc **VS Code (với extension Remote - SSH)**:

  * **Host:** Địa chỉ IP của WSL bạn tìm được ở trên (ví dụ: `sftp://172.x.x.x`).
  * **Port:** Cổng SSH (mặc định là `22`).
  * **Username:** Tên người dùng WSL của bạn.
  * **Password:** Mật khẩu WSL của bạn.

## 2\. Truy cập trực tiếp từ Windows File Explorer

Đối với WSL 2 (và WSL 1), bạn có thể truy cập hệ thống file Linux trực tiếp từ Windows File Explorer bằng cách nhập:
`\\wsl$`

Bạn có thể điều hướng đến thư mục gốc của OpenLiteSpeed (thường là `/usr/local/lsws/`) để chỉnh sửa file.

## 3\. Nếu bạn **nhất định** cần FTP (Không được khuyến nghị)

Nếu bạn cần chạy FTP server (như ProFTPD) bên trong WSL, các bước sẽ tương tự như SSH:

1.  **Cài đặt FTP Server** (ví dụ: `sudo apt install proftpd`).
2.  **Cấu hình FTP** (đặc biệt là chế độ Passive Mode, có thể phức tạp với NAT của WSL 2).
3.  **Tìm IP** của WSL.
4.  **Mở cổng FTP** (mặc định 21 và dải cổng Passive Mode) trong Windows Firewall.
5.  **Kết nối** từ Windows bằng FTP Client.

Tuy nhiên, **SFTP an toàn hơn nhiều** và thường giải quyết được hầu hết các nhu cầu truyền tải file.

Bạn có muốn tôi tìm kiếm thêm thông tin chi tiết về việc cài đặt OpenLiteSpeed và thiết lập quyền truy cập file chính xác cho nó trong môi trường WSL không?

Bạn có thể tham khảo video này để xem cách cài đặt và cấu hình OpenLiteSpeed trên Ubuntu, bao gồm cả các bước kiểm tra hoạt động: [How to Install OpenLiteSpeed on Ubuntu (LOMP web server tutorial)](https://www.youtube.com/watch?v=fEAqeKU6LwU).

http://googleusercontent.com/youtube_content/0

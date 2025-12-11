# // Dữ liệu bạn muốn gửi đến server
const userData = {
    username: "testuser",
    password: "securepassword123"
};

// URL API đăng nhập của bạn
const apiUrl = 'http://your-domain.com/api/login'; 
// Thay thế 'http://your-domain.com' bằng địa chỉ server thực tế của bạn

fetch(apiUrl, {
    method: 'POST', // Phương thức HTTP
    headers: {
        // RẤT QUAN TRỌNG: Khai báo Content-Type là application/json
        // Điều này cho PHP biết rằng body request là JSON.
        'Content-Type': 'application/json'
    },
    // Chuyển đối tượng JavaScript thành chuỗi JSON và đặt vào body
    body: JSON.stringify(userData)
})
.then(response => {
    // Kiểm tra xem response có thành công không (status 200)
    if (response.ok) {
        return response.json();
    } 
    // Nếu không thành công (401 Unauthorized, 404 Not Found, v.v.), ném lỗi
    else {
        // Đọc thông báo lỗi từ body response nếu có thể
        return response.json().then(err => {
            throw new Error(err.error || response.statusText);
        });
    }
})
.then(data => {
    // Xử lý dữ liệu trả về thành công (ví dụ: data = { "success": true, "user": "testuser" })
    console.log('Login successful:', data);
    // Lưu session hoặc token ở đây
})
.catch(error => {
    // Xử lý lỗi (ví dụ: in ra "Invalid credentials")
    console.error('Login failed:', error.message);
});


## form data

<form id="loginForm">
    <input type="text" name="username" value="user_form">
    <input type="password" name="password" value="pass_form">
    <button type="submit">Login</button>
</form>

### gửi lên server = fomdata
const formElement = document.getElementById('loginForm');
const formData = new FormData(formElement); // Tự động lấy username & password!

fetch('/api/login', {
    method: 'POST',
    // QUAN TRỌNG: KHÔNG cần đặt 'Content-Type'. 
    // Fetch sẽ tự động đặt là 'multipart/form-data' hoặc tương tự.
    body: formData 
})
.then(response => {
    // ... xử lý response
});
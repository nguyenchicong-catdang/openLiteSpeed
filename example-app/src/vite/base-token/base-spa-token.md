# Bước A: Gửi yêu cầu đăng nhập để lấy Token
```bash
import axios from 'axios';

async function login(username, password) {
  try {
    const response = await axios.post('https://your-domain.com/api/test', {
      username: username,
      password: password
    });

    // Giả sử server trả về: { token: "abc123xyz..." }
    const { token } = response.data;

    // Lưu token vào localStorage để dùng lại
    localStorage.setItem('accessToken', token);
    
    console.log("Đăng nhập thành công!");
  } catch (error) {
    console.error("Xác thực thất bại:", error.response?.data || error.message);
  }
}
```
# Bước B: Gửi Token trong các yêu cầu API tiếp theo
```bash
async function getData() {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axios.get('https://your-domain.com/api/protected-data', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("Dữ liệu nhận được:", response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("Token hết hạn hoặc không hợp lệ, vui lòng đăng nhập lại.");
    }
  }
}
```
# Tối ưu bằng Axios Interceptors (Khuyên dùng)
```bash
// Cấu hình interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

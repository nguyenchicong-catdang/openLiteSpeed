// vite/src/axion-client.js
// vite/src/axios-client.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/api/', // Ví dụ: http://localhost:8000/api/
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    },
});

// Có thể thêm Interceptor để xử lý CSRF Token hoặc Token bảo mật
axiosClient.interceptors.request.use((config) => {
    // Nếu bạn dùng Laravel Sanctum/Web, bạn có thể lấy token từ cookie/meta ở đây
    // config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
    return config;
});

export default axiosClient;

/**
 * Cách sử dụng để gửi Form (FormData)
 * Trường hợp A: Gửi JSON (Đăng nhập/Đăng ký thông thường)
import axiosClient from './axios-client';

async function login(userData) {
    // userData là một Object {username: '...', password: '...'}
    return await axiosClient.post('/login', userData);
    // Axios thấy đây là Object thuần -> Tự động gửi dạng JSON
}

* Trường hợp B: Gửi FormData (Có chứa File/Ảnh)
import axiosClient from './axios-client';

async function uploadProfile(elmForm) {
    const formData = new FormData(elmForm);

    // Bạn có thể thêm dữ liệu thủ công nếu cần
    formData.append('extra_info', 'some_text');

    return await axiosClient.post('/update-profile', formData);
    // Axios thấy đây là FormData -> Tự động gửi dạng multipart/form-data
}

* Ghi đè Method (Spoofing):
formData.append('_method', 'PUT');
axiosClient.post('/user/1', formData);

* X-Requested-With: Một số phiên bản Laravel yêu cầu header này để xác định là request AJAX.
// Thêm vào axios.create
headers: {
    'X-Requested-With': 'XMLHttpRequest'
}


* axios.defaults.withCredentials = true;
* axios.defaults.withXSRFToken = true;

// vite/src/axios-client.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api', // URL của Laravel
    withCredentials: true,    // Bật gửi Cookie tự động
    withXSRFToken: true,      // Bật tự động lấy CSRF token từ Cookie
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Giúp Laravel nhận diện là AJAX request
    }
});

// Bạn có thể thêm xử lý lỗi tập trung ở đây
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Ví dụ: Nếu lỗi 401 (Chưa đăng nhập), chuyển hướng về trang login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
 */

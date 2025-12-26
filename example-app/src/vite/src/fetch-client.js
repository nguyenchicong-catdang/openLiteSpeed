// vite/src/fetch-client.js
// vite/src/fetch-client.js

// 1. Hàm phụ đọc Cookie (như bạn đã viết)
// vite/src/fetch-client.js
// vite/src/fetch-client.js
// Giải pháp: Tự động phục hồi khi CSRF thay đổi
let csrfPromise = null;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function ensureCsrfCookie(forceRefresh = false) {
    // Nếu forceRefresh = true, ta bỏ qua kiểm tra cookie hiện tại và đi lấy cái mới
    if (!forceRefresh && getCookie('XSRF-TOKEN')) return;

    if (csrfPromise) return csrfPromise;

    csrfPromise = fetch('/sanctum/csrf-cookie', { credentials: 'include' })
        .then(res => {
            csrfPromise = null;
            return res;
        })
        .catch(err => {
            csrfPromise = null;
            throw err;
        });

    return csrfPromise;
}

async function fetchClient(endpoint, options = {}, isRetry = false) {
    const method = (options.method || 'GET').toUpperCase();

    // 1. Đảm bảo có cookie cho lần gọi đầu tiên (nếu là ghi dữ liệu)
    if (method !== 'GET') {
        await ensureCsrfCookie();
    }

    const config = {
        ...options,
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...options.headers
        },
        credentials: 'include',
    };

    // Gắn token mới nhất từ cookie
    const csrfToken = getCookie('XSRF-TOKEN');
    if (csrfToken) {
        config.headers['X-X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
    }

    // 2. Thực hiện request
    const response = await fetch(`/api${endpoint}`, config);

    // 3. Xử lý kịch bản CSRF thay đổi (Lỗi 419)
    if (response.status === 419 && !isRetry) {
        console.warn("CSRF hết hạn, đang lấy lại token mới...");

        // Buộc lấy cookie mới
        await ensureCsrfCookie(true);

        // Gọi lại chính hàm này với tham số isRetry = true để tránh lặp vô tận
        return fetchClient(endpoint, options, true);
    }

    // 4. Xử lý phản hồi JSON
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { status: response.status, data: errorData };
    }

    return response.json();
}

/**
 * Cách sử dụng cực kỳ gọn nhẹ
import fetchClient from './fetch-client';

async function handleLogin(data) {
    try {
        const result = await fetchClient('/login', {
            method: 'POST',
            body: data // Truyền object thẳng vào, hàm base tự stringify
        });
        console.log('Thành công:', result);
    } catch (err) {
        console.error('Lỗi:', err.status, err.data);
    }
}

async function uploadAvatar(elmForm) {
    const formData = new FormData(elmForm);

    const result = await fetchClient('/upload', {
        method: 'POST',
        body: formData // Tự động nhận diện FormData, không gắn Content-Type JSON
    });
}


 */

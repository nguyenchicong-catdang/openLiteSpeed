function reqServer() {
    const elmForm = document.getElementById('formLogin');
    elmForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(elmForm);
        try {
            // const response = await fetch('/api/login', {
            //     method: 'GET',
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // });
            const response = await fetch('/api/login');
            // const response = await fetch('/api/login', {
            //     method: 'post',
            //     body: formData
            // })

           const result = await response.json()
            console.log(result)

        } catch (err) {
            console.error(err)
        }
    })
    //console.log(elmForm)
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

// Với fetch, bạn phải tự viết thế này:
const token = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
fetch('/api/login', {
    headers: { 'X-XSRF-TOKEN': token }
});

async function testCSRF() {
    const elmForm = document.getElementById('formLogin');
    const output = document.getElementById('debug-output');

    elmForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            // BƯỚC 1: Lấy CSRF Cookie (Handshake)
            // Lưu ý: Request này phải đi kèm credentials
            output.innerText = "Đang lấy CSRF Cookie...";
            // Bước 1: Lấy Cookie
            await fetch('/sanctum/csrf-cookie')
//            // await fetch('/sanctum/csrf-cookie', { credentials: 'include' });
            // BƯỚC 2: Gửi request POST chính thức
            const formData = new FormData(elmForm);

            // Bước 2: Gửi request POST
            const response = await fetch('/api/login', {
                method: 'POST',
                //credentials: 'include', // CỰC KỲ QUAN TRỌNG
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                    //'X-XSRF-TOKEN': document.cookie
                    // Laravel sẽ tự tìm token trong Cookie gửi kèm
                    // ĐÍNH KÈM CÁI NÀY ĐỂ HẾT LỖI 419:
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const result = await response.json();
            console.log("Kết quả từ Laravel:", result);
            output.innerText = "Thành công! Kiểm tra console.";

        } catch (err) {
            console.error("Lỗi Debug:", err);
            output.innerText = "Lỗi: " + err.message;
        }
    });
}

async function testCSRF2() {
    const elmForm = document.getElementById('formLogin');
    const output = document.getElementById('debug-output');

    elmForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        output.innerText = "Đang xử lý...";

        try {
            // 1. Lấy Cookie từ Sanctum
            // Cần credentials: 'include' để trình duyệt cho phép nhận cookie từ port khác
            await fetch('/sanctum/csrf-cookie', { credentials: 'include' });

            // 2. Thu thập dữ liệu form ngay tại thời điểm submit
            const formData = new FormData(elmForm);

            // 3. Gửi request POST
            const response = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include', // Bắt buộc để gửi kèm cookie vừa lấy
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Nếu dùng middleware 'web', bạn cần đính kèm X-XSRF-TOKEN ở đây
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            // 4. Đọc kết quả
            const result = await response.json();
            console.log("Kết quả Debug:", result);

            if (response.ok) {
                output.innerText = "Thành công!";
            } else {
                output.innerText = `Lỗi: ${response.status} - ${result.message || 'Unknown'}`;
            }

        } catch (err) {
            console.error("Lỗi kết nối:", err);
            output.innerText = "Lỗi hệ thống, kiểm tra Console.";
        }
    });
}

import axios from 'axios';
// Cực kỳ quan trọng: Cho phép gửi cookie trong các request cross-origin
// axios.defaults.withCredentials = true;
// Cấu hình này thường có sẵn trong bootstrap.js của Laravel
//axios.defaults.withCredentials = true;
//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

async function testWithAxios() {
    const elmForm = document.getElementById('formLogin');

    elmForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //const formData = Object.fromEntries(new FormData(elmForm));
        const formData = new FormData(elmForm)
        try {
            // Bước 1: Handshake (Axios sẽ tự lưu cookie)
            await axios.get('/sanctum/csrf-cookie');

            // Bước 2: Login (Axios sẽ tự đính kèm X-XSRF-TOKEN từ cookie vào header)
            const response = await axios.post('/api/login', formData);

            console.log("Thành công:", response.data);
        } catch (error) {
            // Axios gom lỗi vào biến error.response
            console.error("Lỗi:", error.response?.data || error.message);
        }
    });
}

document.addEventListener("DOMContentLoaded", testCSRF);
// document.addEventListener("DOMContentLoaded", () => {
//     reqServer()
// })

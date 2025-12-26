// example-app/src/vite/login/login-api.js
import axios from 'axios';

function reqServer() {
    const elmForm = document.getElementById('formLogin');
    const elmErr = elmForm.querySelector('.err')
    elmForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(elmForm);
        try {
            // laravel csrf
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post('/api/login-api', formData);
            //const result = await response.json()
            elmForm.reset();
            window.location.href = '/admin/'
            //console.log(response)

        } catch (err) {
            if (err.response && err.response.status === 422) {
                return elmErr.innerHTML = 'không để trống';
            } else if (err.response && err.response.status === 401) {
                return elmErr.innerHTML = 'Tên hoặc tài khoản không đúng';
            }
            return elmErr.innerHTML = 'Vui lòng truy cập lần sau';
        }
    })
}


document.addEventListener('DOMContentLoaded',
    reqServer,
)

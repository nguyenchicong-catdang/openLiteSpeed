// example-app/src/vite/login/lean.js

const cookies = document.cookie
  .split('; ') // Chia chuỗi thành mảng tại vị trí dấu chấm phẩy và khoảng trắng
  .reduce((acc, current) => {
    const [name, value] = current.split('='); // Chia cặp key=value
    acc[name] = decodeURIComponent(value); // Giải mã và lưu vào object
    return acc;
  }, {});

//const arrCookies = document.cookie.split('; ');

// Tạo mảng các mảng con [[key, value], [key, value]]
//const cookiePairs = arrCookies.map(item => item.split('='));

// Chuyển thành đối tượng Map
//const cookieMap = new Map(cookiePairs);

// Cách sử dụng:
//console.log(cookiePairs)
//console.log(cookieMap.get('XSRF-TOKEN'));

// function getCookie(strCookie) {
//     const arrCookies = document.cookie.split('; ');
//     // Tạo mảng các mảng con [[key, value], [key, value]]
//     const cookiePairs = arrCookies.map(item => item.split('='));
//     // Chuyển thành đối tượng Map
//     const cookieMap = new Map(cookiePairs);
//     // Cách sử dụng:
//     // console.log(cookieMap.get('XSRF-TOKEN'));
//     return decodeURIComponent(cookieMap.get(strCookie));
// }

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        // Laravel XSRF-TOKEN thường được mã hóa URI, cần decode
        // parts.pop() -> return arr -> cuoi cung
        // .split(';') -> cat chuoi
        // .shift() -> lấy phẩn tử đầu tiên
        return decodeURIComponent(parts.pop().split(';').shift());
    }
}
function reqServer() {
    const elmForm = document.getElementById('formLogin');
    const errMess = (mess) => {
        const elmErr = elmForm.querySelector('.err');
        elmErr.innerHTML = mess;
    }
    elmForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //console.log(getCookie('XSRF-TOKEN'))
        try {
            const elmForm = document.getElementById('formLogin');
            const formData = new FormData(elmForm)
            await fetch('/sanctum/csrf-cookie')
            // console.log(await fetch('/sanctum/csrf-cookie'))
            // console.log(token);
            // Lấy tất cả cookie dưới dạng một chuỗi văn bản
            // const allCookies = document.cookie;
            // const parts = allCookies.split(`=`)
            //XSRF-TOKEN
            //console.log(cookies['XSRF-TOKEN']); // Kết quả dạng: "user=John; theme=dark; session_id=123"
            const response = await fetch('/api/login-api', {
                method: 'post',
                //credentials: 'include',
                headers: {
                    //'Accept': 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                },
                body: formData
            });
            if (response.ok) {
                console.log('ok')
            }
            if (response.status === 401) {
                //console.log(response)
                return errMess("Tên đăng nhập hoặc mật khẩu không trùng khớp")
            }
            if (response.status === 419) {
                return errMess('xư lý csrf -> get /sanctum/csrf-cookie -> set headers X-XSRF-TOKEN:')
            }
            console.log(await response.json())
        } catch (err) {

            console.error(err)
        }
    })
}

document.addEventListener("DOMContentLoaded",
    reqServer
)

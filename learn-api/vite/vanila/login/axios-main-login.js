// login/main-login.js
import axios from 'axios';
function handleSubmit() {
    const elmForm = document.getElementById('loginForm');
    elmForm.addEventListener('submit', (e) => {
        e.preventDefault();
        reqServer(elmForm)
    })
}

async function reqServer(elmForm) {
    const errMess = elmForm.querySelector('.err-mess');
    const formData = new FormData(elmForm);
    // Object.fromEntries(iterable) @ formData.entries() -> iterable
    const data = Object.fromEntries(formData.entries())

    //console.log(data)
    // const data = {
    //     //username: 'abc',
    //     // password: '12'
    // }
    try {
        // const response = await axios.post('/api/login', data, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // });
        const response = await axios.post('/api/login', data);
        console.log(response)
    } catch (err) {
        const validateErros = err.response.data.errors
        let errHtml = '';
        for (let mess in validateErros) {
            errHtml += `<p style="color:red; margin: 2px 0;">${validateErros[mess]}</p>`
        }
        errMess.innerHTML = errHtml
        //console.log(err.response.data.errors)
        //console.error(err.response.data.errors)
    }
}

document.addEventListener('DOMContentLoaded',
    handleSubmit
)

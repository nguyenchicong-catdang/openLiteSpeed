// vite/test/js/api-test-form.js

const root = document.getElementById('root');

function render(root) {
    const html = /* html */ `
    <form action="">
        User name: <input type="text" name="username" > <br>
        Password: <input type="password" name="password"><br>
        <button type="submit">Submit</button>
    </form>
    `
    root.innerHTML = html
}

function handleSubmit(root) {
    const elmForm = root.querySelector('form');
    elmForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //console.log(1)
        //reqServerFormData(elmForm);
        reqServerJson(elmForm)
    })
}

async function reqServerJson(elmForm) {
    const formData = new FormData(elmForm);
    // chuyen data -> OBJ
    // formData.entries() => Iterator()
    const data = Object.fromEntries(formData.entries())
    try {
        const response = await fetch('/api/test-form', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result)
    } catch (err) {
        console.error(err);
    }

}

async function reqServerFormData(elmForm) {
    const formData = new FormData(elmForm)
    try {
        const response = await fetch('/api/test-form', {
            method: 'post',
            body: formData
        });
        const result = await response.json();
        console.log(result)
    } catch (err) {

        console.log(err)
    }
}

async function reqServerJsonV1(elmForm) {
    const username = elmForm.querySelector('input[name=username]').value;
    const password = elmForm.querySelector('input[name=password]').value;

    const data = {
        username: username,
        password: password
    }
    const response = await fetch('/api/test-form', {
        method: 'POST', // Nên viết hoa cho đúng chuẩn
        headers: {
            'Content-Type': 'application/json', // Bắt buộc phải có để Laravel hiểu đây là JSON
            'Accept': 'application/json'        // Để Laravel trả về lỗi dạng JSON nếu có
        },
        body: JSON.stringify(data) // Chuyển object thành chuỗi JSON
    });
    //console.log(data)
    const result = await response.json();
    console.log(result)
}

function init() {
    render(root);
    handleSubmit(root);
}

window.getMethod = async () => {
    //console.log(1)
    try {
        const response = await fetch('/api/method-get');
        const result = await response.json()
        console.log(response)
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}

window.postMethod = async () => {
    try {
        const response = await fetch('/api/method-post', {
            method: 'post'
        });
        const result = await response.json()
        console.log(response)
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}


document.addEventListener('DOMContentLoaded',
    init,
);

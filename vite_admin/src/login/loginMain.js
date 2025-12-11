async function reqApi() {
    const response = await fetch('/dev/api-login/');
    const result = await response.json();
    console.log(result)
}

function handleSubmit() {
    const form = document.getElementById('formLogin');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        reqServer(form)
        //console.log(1)
    })
}

async function reqServer(form) {
    const formData = new FormData(form);
    try {
        const response = await fetch('/api/login/', {
            method: "post",
            body: formData
        });
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                form.reset();
                window.location = '/admin/';
            }
        }

    } catch (err) {
        console.error(err)
    }
    //console.log(result)
    //console.log(formData.body);
}

document.addEventListener("DOMContentLoaded", () => {
    handleSubmit()
    //reqApi();
})

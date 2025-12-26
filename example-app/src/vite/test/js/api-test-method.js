// vite/test/api-test-method.js

const root = document.getElementById('root');

function render() {

    const html = /* html */ `
    <button onclick="getMethod()">Test get</button>
    <button onclick="postMethod()">Test post</button>
    `
    root.innerHTML = html
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

window.postMethod = async() => {
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
    render,
);

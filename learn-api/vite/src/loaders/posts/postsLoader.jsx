// loader/postsLoader.jsx

export async function postsLoader() {
    const token = localStorage.getItem('laravel_token');

    const response = await fetch('/api/posts', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw new Response('khong lay duoc du lieu', {status: response.status})
    }
    const result = await response.json()
    //console.log(result)
    return result
}

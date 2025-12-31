// loaders/posts/postsEditLoader.jsx
export async function postsEditLoader({params}) {
    const id = params.id;
    const token = localStorage.getItem('laravel_token');

    try {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.ok) {
            return await response.json();
            //console.log(result)

        } else {
            //console.error(response.statusText)
            throw new Response(response.statusText, { status: response.status })
        }
    } catch (err) {
        if (err instanceof Response) {
            throw err
        }
        // Nếu là lỗi kết nối (Network error, rớt mạng...)
        throw new Response(err);
    }
}

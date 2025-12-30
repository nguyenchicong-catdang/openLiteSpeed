// loaders/posts/postsShowLoader.jsx
export async function postsShowLoader({params}) {
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
        console.log(response)
        if (!response.ok) {
            throw new Response('Không tìm thấy', {status:404})
        }
        const result = await response.json();
        //console.log(result)
        return result
    } catch (err) {
        console.error(err)
        throw new Response('Loi mang', {status: 500})
    }

    //console.log(id)
}

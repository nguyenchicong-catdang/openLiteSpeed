// actions/posts/postsUpdateAction.jsx

// https://api.reactrouter.com/v7/interfaces/react_router.ActionFunctionArgs.html
export async function postsUpdateAction({ request, params }) {
    try {
        const id = params.id
        const formData = await request.formData()
        const token = localStorage.getItem('laravel_token')
        // let title = formData.get('title')
        // console.log(id)

        const response = await fetch(`/api/posts/${id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(response)
        if (response.ok) {
            return await response.json()
        }

        // TRƯỜNG HỢP LỖI VALIDATION (422)
        if (response.status === 422) {
            return await response.json()
        }

        throw new Response(response.statusText + ' | ' + response.status, { status: response.status })
    } catch (err) {
        if (err instanceof Response) {
            throw err
        }
        //console.log(err)
        // Trường hợp lỗi mạng thực sự (mất mạng, DNS lỗi)
        throw new Response(err);
    }
}

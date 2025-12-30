// actions/posts/postsStoreAction.jsx
import { redirect } from "react-router";
export async function postsStoreAction({request}) {
    const formData = await request.formData()
    // const data = Object.fromEntries(formData)
    // console.log(data)

    // token
    const token = localStorage.getItem('laravel_token');
    try {
        const response = await fetch('/api/posts', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })

        if (response.ok) {
            // console.log(response)
            // return { success: true };
            //return
            return redirect('/posts')
        } else {
            const result = await response.json()
            // if (result.errors) {
            //     return result.errors
            // }
            // console.log(result)
            return result.errors || { message: "Có lỗi xảy ra" };
        }


    } catch (err) {
        console.error(err)
        return { network: "Không thể kết nối đến máy chủ" };
    }
}

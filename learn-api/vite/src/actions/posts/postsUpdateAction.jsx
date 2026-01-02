// actions/posts/postsUpdateAction.jsx
import { redirect } from "react-router";
// https://api.reactrouter.com/v7/interfaces/react_router.ActionFunctionArgs.html
export async function postsUpdateAction({ request, params }) {
   const id = params.id
   const formData = await request.formData()
   const token = localStorage.getItem('laravel_token')
   // let title = formData.get('title')
   // console.log(id)

   const response = await fetch(`/api/posts/${id}`, {
      method: 'POST',
      headers: {
         'X-HTTP-Method-Override': 'PUT',
         'Accept': 'application/json',
         'Authorization': 'Bearer ' + token
      },
      body: formData
   });
   //console.log(response)
   if (response.ok) {
      //return await response.json()
      throw redirect('/posts');
   }

   // TRƯỜNG HỢP LỖI VALIDATION (422)
   if (response.status === 422) {
      return await response.json()
   }

   throw new Response(response.statusText + ' | ' + response.status, { status: response.status })
}

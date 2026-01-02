import { redirect } from "react-router";

// actions/posts/postsDestroyAction.jsx
export async function postsDestroyAction({request, params}) {
   const id = params.id;
   const token = localStorage.getItem('laravel_token')
   const response = await fetch(`/api/posts/${id}`, {
      method: 'POST',
      headers: {
         'X-HTTP-Method-Override': 'DELETE',
         'Accept': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   });
   //console.log(id)
   if (response.ok) {
      //console.log('ok')
      throw redirect('/posts')
   }

   throw new Response(response.statusText, {status: response.status})
}

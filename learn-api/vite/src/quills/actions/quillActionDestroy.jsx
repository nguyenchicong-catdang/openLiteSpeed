import { redirect } from "react-router";

export async function quillActionDestroy({params}) {
   const id = params.id;
   const token = localStorage.getItem('laravel_token')
   const response = await fetch(`/api/quills/${id}`, {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'X-HTTP-Method-Override': 'DELETE',
         'Authorization': 'Bearer '+token
      }
   });

   if (response.ok) throw redirect('/quills');

   throw new Response(response.statusText, {status:response.status})
}

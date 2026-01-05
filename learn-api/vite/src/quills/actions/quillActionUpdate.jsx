import { redirect } from "react-router";

export async function quillActionUpdate({ request, params }) {
   const id = params.id
   const formData = await request.formData();
   const token = localStorage.getItem('laravel_token')
   //console.log(formData.get('delta_content'), id);
   const response = await fetch(`/api/quills/${id}`, {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'X-HTTP-Method-Override': 'PUT',
         'Authorization': 'Bearer '+token
      },
      body: formData
   });

   if (response.ok) throw redirect(`/quills/${id}`);

   if (response.status === 422) return await response.json();

   throw new Response(response.statusText, {status:response.status})
}

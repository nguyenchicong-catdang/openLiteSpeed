import { redirect } from "react-router";

export async function mediaActionStore({ request }) {
   const formData = await request.formData();
   const file = formData.get('file');
   const token = localStorage.getItem('laravel_token')
   // console.log(formData.get('my_file'))
   // if (!file || file.size === 0) return { errors: "Vui lòng chọn một file" };
   const response = await fetch('/api/media', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer '+token
      },
      body: formData
   });

   if (response.ok) throw redirect('/media');

   if (response.status === 422) return await response.json();

   throw new Response(response.statusText, {status:response.status})
}

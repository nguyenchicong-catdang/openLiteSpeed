import { redirect } from "react-router";

export async function quillActionStore({request}) {
   const formData = await request.formData();
   // Chuyển đổi thành Object (để dễ console.log và xử lý)
   //  const data = Object.fromEntries(formData);
   // console.log(data.title);
   // console.log(data.quillJsonContent);
   // console.log(formData.get('title'));
   // console.log(formData.get("delta_content"));
   // console.log(formData.get("html_content"));
   const token = localStorage.getItem('laravel_token');
   const response = await fetch('/api/quills', {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer '+ token
      },
      body: formData
   });

   if (response.ok) throw redirect('/quills');

   if (response.status === 422) return await response.json()

   throw new Response(response.statusText, {status:response.status})
}

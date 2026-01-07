import { redirect } from "react-router";

export async function mediaActionUpdate({request}) {
   const formData = await request.formData();
   const id = formData.get('id')
   const type = formData.get("type");
   console.log(type)
//    console.log(Object.fromEntries(formData.entries()));
//    return (
//     <div>mediaActionUpdate</div>
   //   )
   const token = localStorage.getItem('laravel_token')
   const response = await fetch(`/api/media/${id}`, {
      method: "POST",
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer ' + token,
         'X-HTTP-Method-Override': 'PUT'
      },
      body: formData
   });
   if (response.ok) throw redirect('/media');
   // if (response.ok) console.log(await response.json());
   throw new Response(response.statusText, {status:response.status})
}

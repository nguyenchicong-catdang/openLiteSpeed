// actions/posts/upload/uploadImageAction.jsx
export async function uploadImageAction({request}) {
   const formData = await request.formData();
   const token = localStorage.getItem('laravel_token');

   const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
         "Accept": "application/json",
         "Authorization": `Bearer ${token}`,
      },
      body: formData
   })

   if (response.ok) {
      return await response.json();
   }

   throw new Response(response.statusText, {status:response.status})
}

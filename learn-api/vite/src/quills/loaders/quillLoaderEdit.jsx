export async function quillLoaderEdit({params}) {
   const id = params.id;
   const token = localStorage.getItem('laravel_token')
   const response = await fetch(`/api/quills/${id}/edit`, {
      method: "GET",
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer '+token
      }
   })

   if (response.ok) return response.json()

   throw new Response(response.statusText, {status:response.status})
}

export async function mediaLoaderShow({request, params}) {
   //const url = new URL(request.url);
   const id = params.id;
   const token = localStorage.getItem('laravel_token')
   const response = await fetch(`/api/media/${id}`, {
      method: "GET",
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer '+token
      }
   })

   if (response.ok) return response.json();
   throw new Response(response.statusText, {status:response.status})
   //console.log(url, id);
//    return (
//     <div>mediaLoaderEdit</div>
//   )
}

export async function mediaLoaderIndex({request}) {
   const url = new URL(request.url);
   const type = url.searchParams.get("type") || "all";
   //console.log(type);
   // Gọi đến API Laravel
   const token = localStorage.getItem('laravel_token')
   const response = await fetch(`/api/media?type=${type}`, {
      method: "GET",
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Bearer '+token
      }
   });

   if (response.ok) return response.json();

   throw new Response(response.statusText, {status:response.status})
}

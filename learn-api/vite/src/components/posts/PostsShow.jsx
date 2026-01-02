import { useFetcher, useLoaderData } from "react-router"

export default function PostsShow() {
   const post = useLoaderData();
   const fetcher = useFetcher();
   //console.log(post)
   const clickBtnDestroy = (id) => {
      if (confirm("Ban co chac xoa khong")) {
         //fetcher.submit(data, options)
         fetcher.submit(null,{method:"POST", action: `/posts/${id}/destroy`})
      }
   }
  return (
      <div>
        <h3>{post.title}</h3>
         <button onClick={()=>clickBtnDestroy(post.id)}>Destroy</button>
          <p>{ post.content}</p>
    </div>
  )
}

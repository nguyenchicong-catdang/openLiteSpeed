import { useFetcher, useLoaderData } from "react-router";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
export default function PostsShow() {
   const post = useLoaderData();
   const fetcher = useFetcher();
   //console.log(post);
   const clickBtnDestroy = (id) => {
      if (confirm("Ban co chac xoa khong")) {
         //fetcher.submit(data, options)
         fetcher.submit(null, {
            method: "POST",
            action: `/posts/${id}/destroy`,
         });
      }
   };
   return (
      <div>
         <h3>{post.title}</h3>
         <button onClick={() => clickBtnDestroy(post.id)}>Destroy</button>
         <div>
            {post.content ? (
               <ReactQuill
                  value={
                     typeof post.content === "string"
                        ? JSON.parse(post.content)
                        : post.content
                  }
                  readOnly={true}
                  theme="bubble"
                  modules={{ toolbar: false }}
               />
            ) : (
               <p>Không có nội dung</p>
            )}
         </div>
      </div>
   );
}

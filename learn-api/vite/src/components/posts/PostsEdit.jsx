import { Form, useActionData, useLoaderData } from "react-router";
import QuillEditor from "../QuillEditor";
import { useState } from "react";
export default function PostsEdit() {
   const post = useLoaderData();
   const actionData = useActionData();
   console.log(post)
   // State chứa dữ liệu HTML để hiển thị và sửa
   const [content, setContent] = useState(post.content || "");

   return (
      <div>
         <Form method="POST">
            {/* Đảm bảo post đã tồn tại mới render editor để tránh lỗi null */}
            {post && (
               <>
                  Title:{" "}
                  <input type="text" name="title" defaultValue={post.title} />
                  <QuillEditor value={content} onChange={setContent} />
                  <input type="hidden" name="content" value={content} />
               </>
            )}
            <button type="submit">Update</button>
         </Form>
         {/* ... phần hiển thị lỗi */}
      </div>
   );
}

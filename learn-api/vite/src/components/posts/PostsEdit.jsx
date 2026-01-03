import { Form, useActionData, useLoaderData } from "react-router";
import QuillEditor from "../QuillEditor";
import { useState } from "react";
export default function PostsEdit() {
   const post = useLoaderData();
   const actionData = useActionData();

   // State chứa dữ liệu HTML để hiển thị và sửa
   const [content, setContent] = useState(post.content || "");

   return (
      <div>
         <Form method="POST">
            Title: <input type="text" name="title" defaultValue={post.title} />
            <br />
            {/* Truyền state 'content' xuống Editor */}
            <QuillEditor value={content} onChange={setContent} />
            {/* Input ẩn này dùng để gửi dữ liệu HTML lên Laravel */}
            <input type="hidden" name="content" value={content} />
            <button type="submit">Update</button>
         </Form>
         {/* ... phần hiển thị lỗi */}
      </div>
   );
}

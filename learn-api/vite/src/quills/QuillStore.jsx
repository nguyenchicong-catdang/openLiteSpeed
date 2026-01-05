import { useRef } from "react";
import Editor from "./Editor";
import { useActionData, useSubmit } from "react-router";

export default function QuillStore() {
   const quillRef = useRef();
   const titleRef = useRef();
   const submit = useSubmit();
   const actionData = useActionData();
   const errors = actionData?.errors || {};
   //console.log(errors);
   const handleSubmit = () => {
      const titleValue = titleRef.current.value;
      const quillContents = JSON.stringify(quillRef.current.getContents());
      const quillHtml = quillRef.current.root.innerHTML;
      // console.log(titleValue)
      // console.log(quillContents);
      // console.log(typeof quillHtml);
      const data = {
         title: titleValue,
         delta_content: quillContents,
         html_content: quillHtml,
      };
      submit(data, { method: "POST" });
   };
   return (
      <div style={{ marginTop: "15px" }}>
         <button onClick={handleSubmit}>Create Quill</button>
         <div>
            {/* Kiểm tra nếu errors tồn tại và có dữ liệu thì mới render */}
            {errors &&
               Object.entries(errors).map(([key, err]) => (
                  <p key={key} style={{ color: "red" }}>
                     {err}
                  </p>
               ))}
         </div>
         <br />
         <br />
         Title: <input ref={titleRef} type="text" />
         <br />
         <Editor ref={quillRef} />
      </div>
   );
}

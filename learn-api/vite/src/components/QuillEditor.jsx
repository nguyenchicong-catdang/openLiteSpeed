import { useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Nhận value và onChange từ component cha truyền xuống
export default function QuillEditor({ value, onChange }) {
   const quillRef = useRef(null);
   useEffect(() => {
      if (value && value.startsWith('{"ops":')) {
         try {
            const delta = JSON.parse(value);
            const editor = quillRef.current.getEditor();
            editor.setContents(delta);
         } catch (e) {
            console.error(e);
         }
      }
   }, [value]);
   const handleChange = (content, delta, source, editor) => {
      // Khi người dùng gõ, ta trả về JSON Delta dưới dạng string để lưu vào database
      const rowJson = JSON.stringify(editor.getContents())
      // Truyền dữ liệu ngược lại cho cha thông qua hàm onChange
      onChange(rowJson);
   };

   return (
      <div style={{ margin: "10px" }}>
         <ReactQuill
            ref={quillRef}
            theme="snow"
            onChange={handleChange}
         />
      </div>
   );
}

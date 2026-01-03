import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Nhận value và onChange từ component cha truyền xuống
export default function QuillEditor({ value, onChange }) {
   const handleChange = (content, delta, source, editor) => {
      // Truyền dữ liệu ngược lại cho cha thông qua hàm onChange
      onChange(content);
   };

   return (
      <div style={{ margin: "10px" }}>
         <ReactQuill
            theme="snow"
            value={value} // Dữ liệu từ cha sẽ được hiển thị ở đây
            onChange={handleChange}
         />
      </div>
   );
}

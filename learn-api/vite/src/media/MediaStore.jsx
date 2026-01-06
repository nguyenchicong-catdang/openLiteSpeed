import { useState } from "react"
import { Form, useActionData } from "react-router"
export default function MediaStore() {
   const [previewUrl, setPreviewUrl] = useState(null);
   const [fileType, setFileType] = useState('');
   const actionData = useActionData();
   const errors = actionData?.errors || {};
   console.log(errors);
   // file change
   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Danh sách các loại file cho phép
      // const allowedTypes = [
      //    "image/jpeg",
      //    "image/png",
      //    "application/pdf",
      //    "video/mp4",
      // ];

      //setFileType(file.type);
      if (!allowedTypes.includes(file.type)) {
         alert(
            "Lỗi: Định dạng file không hợp lệ! Vui lòng chỉ chọn Ảnh, Video hoặc PDF."
         );
         e.target.value = ""; // Reset input
         setPreviewUrl(null);
         return
      }

      setFileType(file.type);
      // Tạo một URL tạm thời cho file vừa chọn
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      // Lưu ý: Giải phóng bộ nhớ nếu cần (tùy chọn)
      // return () => URL.revokeObjectURL(url);
      console.log(fileType);
   }
  return (
     <div>
        <Form method="POST" encType="multipart/form-data">
           File:
           <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*,video/*,application/pdf"
           />
           <br />
           <button type="submit">Upload File</button>
           {/* Bắt lỗi errors */}
           {errors &&(
                    <>
                       {Object.entries(errors).map(([key, err]) => (
                          <p key={key}>{err[0]}</p>
                       ))}
                    </>
                 )}
        </Form>
        {/* --- KHU VỰC HIỂN THỊ PREVIEW --- */}
        <div>
           {previewUrl && (
              <div>
                 <p>Xem trước:</p>
                 {/* Nếu là Hình ảnh */}
                 {fileType.startsWith("image/") && (
                    <img src={previewUrl} alt="" />
                 )}
                 {/* Nếu là Video */}
                 {fileType.startsWith("video/") && (
                    <video src={previewUrl} controls type="" />
                 )}
                 {/* Nếu là PDF */}
                 {fileType === "application/pdf" && (
                    <embed src={previewUrl} type="application/pdf" />
                 )}
                 {/* Các định dạng khác */}
                 {!fileType.startsWith("image/") &&
                    !fileType.startsWith("video/") &&
                    fileType !== "application/pdf" && (
                       //   <p>Đã chọn file: {fileType}</p>
                       <p>
                          Đã chọn file: {fileType} Không đúng đinh dạng vui lòng
                          chọn lại file
                       </p>
                    )}
              </div>
           )}
        </div>
     </div>
  );
}

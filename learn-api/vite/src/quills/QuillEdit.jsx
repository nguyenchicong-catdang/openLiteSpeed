import { useFetcher, useLoaderData, useNavigate, useSubmit } from "react-router";
import Editor from "./Editor";
import { useRef } from "react";

export default function QuillEdit() {
   const loaderData = useLoaderData();
   const quillRef = useRef();
   const titleRef = useRef();
   const navigate = useNavigate();
   const submit = useSubmit();
   const oldContent = loaderData?.delta_content || "";
   //const actionData = useActionData()
   const fetcher = useFetcher();
   // // 2. Lấy actionData từ fetcher thay vì useActionData
   const actionData = fetcher.data;
   const errors = actionData?.errors || {};
   //console.log(errors);
   const clickBtnCancel = () => {
      // const backUrl = document.referrer;
      // console.log(backUrl);
      // if (backUrl) return navigate(backUrl);
      // return navigate("/quills");
      window.history.length > 2 ? navigate(-1) : navigate("/quills");
      // console.log(window.history.length);
   };
   const clickBtnUpdate = (id) => {
      const titleValue = titleRef.current.value;
      const quillDelta = quillRef.current.getContents();
      const qullHtml = quillRef.current.root.innerHTML;
      //console.log(quillDelta, qullHtml);
      const data = {
         title: titleValue,
         delta_content: JSON.stringify(quillDelta),
         html_content: qullHtml,
      };
      //console.log(data);
      fetcher.submit(data, { method: "POST", action: `/quills/${id}/update` });
   };
   return (
      <div>
         {loaderData ? (
            <div style={{ marginTop: "10px" }}>
               Title:{" "}
               <input
                  ref={titleRef}
                  type="text"
                  defaultValue={loaderData.title}
               />
               <br />
               <button
                  onClick={() => {
                     clickBtnUpdate(loaderData.id);
                  }}
                  style={{ margin: "10px" }}
               >
                  Update Quill
               </button>
               <button onClick={clickBtnCancel}>Cancel</button>
               <div>
                  {errors && Object.entries(errors).map(([key, err]) =>
                     <p style={{color:'red'}} key={key}>{ err}</p>
                  )}
               </div>
               <Editor ref={quillRef} defaultValue={JSON.parse(oldContent)} />
            </div>
         ) : (
            <p>Khong co noi dung</p>
         )}
      </div>
   );
}

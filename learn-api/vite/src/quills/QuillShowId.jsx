import { Link, useNavigate, useLoaderData, useSubmit } from "react-router"

export default function QuillShowId() {
   const loaderData = useLoaderData();
   const navigate = useNavigate();
   const submit = useSubmit();
   //console.log(loaderData)
   const clickBtnEdit = (id) => {
      //console.log(id)
      navigate(`/quills/${id}/edit`)
   }
   const clickBtnDelete = (id) => {
      submit(null, { method: "POST", action: `/quills/${id}/destroy` });
   }
   return (
      <div>
         {loaderData ? (
            <div>
               <h3>{loaderData.title}</h3>
               <Link to="/quills">Quay ve trang chu</Link>
               <button onClick={() => { clickBtnEdit(loaderData.id) }} style={{ marginLeft: "10px" }}>Edit Quill</button>
               <button onClick={()=>{clickBtnDelete(loaderData.id);}} style={{margin:"10px"}}>Delete Quill</button>
               <div dangerouslySetInnerHTML={{ __html: loaderData.html_content}} />
            </div>
         ) : (
            <p>Khong co noi dung</p>
         )}
      </div>
   );
}

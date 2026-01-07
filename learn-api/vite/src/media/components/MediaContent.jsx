import { useLoaderData, useNavigate, useSearchParams } from "react-router"

export default function MediaContent() {
   // const {file} = useLoaderData()
   const loaderData = useLoaderData()
   const files = loaderData?.data || [];
   console.log(files);
   const [searchParams] = useSearchParams()
   const currentType = searchParams.get('type') || 'all'
   //console.log(currentType);
   const navigate = useNavigate();
   return (
      <div className="w-3/6 bg-sky-50">
         <h2>Danh sach</h2>
         <div className="columns-3">
            {files.length > 0 ? (
               files.map((file) => (
                  <div
                     key={file.id}
                     // onClick={() => {
                     //    // onSelectFile(file);
                     // }}
                     onClick={() =>
                        navigate(`/media/${file.id}?type=${file.type}`)
                     } // truyen url
                  >
                     {/* Hiển thị tùy theo loại file */}
                     {currentType === "image" && <img src={file.url} alt="" />}
                     {currentType === "video" && <video src={file.url}></video>}
                     {currentType === "pdf" && (
                        <a
                           href={file.url}
                           target="_blank"
                           className="text-blue-500 underline text-xs mt-1"
                        >
                           Xem chi tiết
                        </a>
                     )}
                  </div>
               ))
            ) : (
               <p>Khong co file</p>
            )}
         </div>
      </div>
   );
}

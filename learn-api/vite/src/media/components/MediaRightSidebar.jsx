import { Form } from "react-router";

export default function MediaRightSidebar({ file }) {
   // console.log(file);
   return (
      <div className="w-2/6 p-2">
         {file ? (
            <div>
               <h3>Chi tiet</h3>
               <Form method="POST">
                  {/* TRUYỀN ID VÀ TYPE QUA INPUT ẨN */}
                  <input type="hidden" name="id" value={file.id} />
                  <input type="hidden" name="type" value={file.type} />
                  {/* <input type="hidden" name="_method" value="PUT" /> */}
                  {/* Trường Alt - Chỉ cho Image */}
                  {file.type === "image" && (
                     <div>
                        <img
                           className="aspect-square object-contain"
                           src={file.url}
                        />
                        <div className="grid gap-1">
                           Alt:{" "}
                           <input
                              className="border"
                              type="text"
                              name="alt"
                              placeholder="Atl Mo ta hinh anh"
                           />
                           Caption:{" "}
                           <input
                              className="border"
                              type="text"
                              name="caption"
                              placeholder="Caption Hinh anh"
                           />
                           <button
                              className="cursor-pointer border mt-1 rounded-md hover:bg-gray-300"
                              type="submit"
                           >
                              Update Image
                           </button>
                        </div>
                     </div>
                  )}
               </Form>
            </div>
         ) : (
            <p>Vui long choj file</p>
         )}
      </div>
   );
}

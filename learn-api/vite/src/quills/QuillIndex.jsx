import { Link, useLoaderData } from "react-router";

export default function QuillIndex() {
   const loaderData = useLoaderData();
   console.log(loaderData)
   // return loaderData ? (
   //    <>
   //       {loaderData.map((data) => (
   //          <div key={data.id}>
   //             <h3>{data.title}</h3>
   //             <div dangerouslySetInnerHTML={{ __html: data.html_content }} />
   //          </div>
   //       ))}
   //    </>
   // ) : (
   //    <p>khong co noi dung</p>
   // );
   return (
      <>
         {loaderData && loaderData.length > 0 ? (
            <>
               {loaderData.map((data) => (
                  <div key={data.id}>
                     <h3>
                        <Link to={`/quills/${data.id}`}>{data.title}</Link>
                     </h3>
                     <div
                        dangerouslySetInnerHTML={{ __html: data.html_content }}
                     />
                  </div>
               ))}
            </>
         ) : (
            <p>Khong co noi dung</p>
         )}
      </>
   );
}

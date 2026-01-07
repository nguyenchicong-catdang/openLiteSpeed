import { useLoaderData } from "react-router"
import MediaRightSidebar from "./components/MediaRightSidebar";

export default function MediaEdit() {
   const loaderData = useLoaderData();
   // console.log(loaderData);
  return (
     <div className="w-2/6 p-2">
        <MediaRightSidebar file={loaderData} />
     </div>
  );
}

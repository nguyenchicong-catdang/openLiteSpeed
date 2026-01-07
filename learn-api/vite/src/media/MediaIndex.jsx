import { useState } from "react";
import MediaContent from "./components/MediaContent";
// import MediaRightSidebar from "./components/MediaRightSidebar";
import MediaSidebar from "./components/MediaSidebar";
import { Outlet } from "react-router";

export default function MediaIndex() {
   const [selectedFile, setSelectedFile] = useState(null);
  return (
     <div className="flex">
        <MediaSidebar />
        <MediaContent onSelectFile={setSelectedFile} />
        {/* <MediaRightSidebar file={selectedFile} /> */}
        <Outlet />
    </div>
  )
}

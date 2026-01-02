import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import UploadImage from "./components/UploadImage";

// App.jsx
export default function App() {
   return (
      <div>
         <Sidebar />
         <UploadImage />
         <Outlet />
      </div>
   )
}

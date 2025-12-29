import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

// App.jsx
export default function App() {
  return (
      <div>
          <Sidebar />
          <Outlet />
    </div>
  )
}

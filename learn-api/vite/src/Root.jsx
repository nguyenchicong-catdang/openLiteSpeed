import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

// Root.jsx
export default function Root() {
    let location = useLocation();
    useEffect(() => {

    }, [location]);
  return (
      <div>
          <Outlet />
    </div>
  )
}

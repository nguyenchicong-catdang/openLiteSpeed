// vite_admin/src/feature/feature_learn_react-router-dom/templates/Layout.jsx
//import { Route, Routes } from "react-router";
import { Outlet } from "react-router";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
function Layout() {
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
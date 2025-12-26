// vite_admin/src/admin/component/Layout/AdminLayout.jsx (ĐÃ SỬA)
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// 1. Phải nhận prop 'children'
function AdminLayout() {
    return (
        <div className="admin-page-wrapper">
            <Header />
            <Sidebar />

            {/* 2. Hiển thị nội dung trang (PostList, PostCreate...) */}
            <main className="main-content">
                {/* <Outlet /> là nơi Route con (PostList, PostCreate...) sẽ được đưa vào */}
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
// vite_admin/src/admin/component/Layout/AdminLayout.jsx (ĐÃ SỬA)

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// 1. Phải nhận prop 'children'
function AdminLayout({ children }) {
    return (
        <div className="admin-page-wrapper">
            <Header />
            <Sidebar />

            {/* 2. Hiển thị nội dung trang (PostList, PostCreate...) */}
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;
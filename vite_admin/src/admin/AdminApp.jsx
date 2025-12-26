// vite_admin/src/admin/AdminApp.jsx (ĐÃ SỬA: Loại bỏ tiền tố /admin/ khỏi Route)

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AdminLayout from "./component/Layout/AdminLayout";
import PostList from './pages/PostList';
import PostCreate from './pages/PostCreate';

function AdminApp() {
    return (
        <BrowserRouter basename="/admin">
            <Routes>
                {/* ĐỊNH NGHĨA ROUTE CHA DÙNG AdminLayout */}
                <Route path="/" element={<AdminLayout />}>
                    {/* 1. Route Con: Đường dẫn gốc Admin (sẽ hiển thị trong Outlet) */}
                    <Route index element={<h1>Chào mừng Admin!</h1>} />

                    {/* 2. Route Con: Các trang CRUD */}
                    <Route path="post-list" element={<PostList />} />
                    <Route path="post-insert" element={<PostCreate />} />
                    <Route path="post-update/:id" element={<h2>Post Update Component</h2>} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AdminApp;
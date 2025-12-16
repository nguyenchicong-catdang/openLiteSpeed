# npm install react-router-dom

npm install react-router-dom

## thm khao

// src/admin/AdminApp.jsx

import { HashRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './component/Layout/AdminLayout'; // Component bố cục của bạn

// Import các component trang CRUD
import PostList from './pages/PostList';
import PostCreate from './pages/PostCreate';
import PostUpdate from './pages/PostUpdate'; 
// import PostDelete (thường được thực hiện qua List, không cần trang riêng)

function AdminApp() {
    return (
        // Sử dụng HashRouter để phù hợp với URL localhost:5173/admin/#
        <HashRouter> 
            <AdminLayout>
                {/* Routes là nơi bạn định nghĩa các đường dẫn URL */}
                <Routes>
                    {/* Trang mặc định (ví dụ: dashboard) */}
                    <Route path="/" element={<h1>Chào mừng Admin!</h1>} /> 
                    
                    {/* Routes CRUD cho Post */}
                    <Route path="/post-list" element={<PostList />} />
                    <Route path="/post-insert" element={<PostCreate />} />
                    <Route path="/post-update/:id" element={<PostUpdate />} />
                    
                    {/* Ví dụ trang 404 */}
                    <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
                </Routes>
            </AdminLayout>
        </HashRouter>
    );
}

export default AdminApp;
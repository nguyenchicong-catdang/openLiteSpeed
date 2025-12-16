// vite_admin/src/admin/pages/PostCreate.jsx
import React from 'react';

function PostCreate() {
    // Logic: Xử lý state form và submit data lên API
    return (
        <div className="post-create">
            <h2>Tạo Bài viết Mới</h2>
            <form>
                {/* Các input form */}
                <button type="submit">Lưu Bài viết</button>
            </form>
        </div>
    );
}

export default PostCreate;
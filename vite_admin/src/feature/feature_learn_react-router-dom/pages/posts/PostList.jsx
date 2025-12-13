// vite_admin/src/feature/posts/pages/PostList.jsx

//import React from 'react';
import { useOutletContext, useNavigate } from 'react-router';

function PostList() {
    // ⭐ Lấy dữ liệu (posts, isLoading, error) từ PostLayout ⭐
    const { posts, isLoading, error, addPost } = useOutletContext();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Đang tải danh sách bài viết...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div>
            <h2>Danh sách Bài viết</h2>
            <button onClick={() => navigate('create')}>Thêm Bài viết Mới</button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        {/* Nút Edit sẽ navigate tới /posts/edit/:id */}
                        <button onClick={() => navigate(`edit/${post.id}`)}>Sửa</button>
                    </li>
                ))}
            </ul>
            {/* Thử gọi hàm addPost (ví dụ) */}
            <button onClick={() => addPost({ title: "Bài Mới Thêm", content: "Nội dung" })}>
                Test Add (từ List)
            </button>
        </div>
    );
}

export default PostList;
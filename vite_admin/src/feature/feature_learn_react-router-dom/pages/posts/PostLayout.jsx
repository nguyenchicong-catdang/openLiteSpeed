// vite_admin/src/feature/posts/PostLayout.jsx

//import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from "react-router";// Dùng để hiển thị Component con


// Dữ liệu giả định mô phỏng API
const DUMMY_POSTS = [
    { id: 1, title: "Bài viết 1", content: "Nội dung 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung 2" },
];

function PostLayout() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // ⭐ 1. Logic Quản lý State/API (READ ALL) ⭐
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Giả lập thời gian gọi API
                await new Promise(resolve => setTimeout(resolve, 1000));
                setPosts(DUMMY_POSTS); // Cập nhật danh sách bài viết
                setIsLoading(false);
            } catch (err) {
                setError("Không thể tải dữ liệu bài viết.");
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // ⭐ 2. Logic Thao tác CRUD (ví dụ: ADD) ⭐
    const addPostHandler = (newPost) => {
        // Giả lập gọi API POST và cập nhật state
        const newId = Date.now();
        const postWithId = { ...newPost, id: newId };
        setPosts((prevPosts) => [...prevPosts, postWithId]);
        // Thực tế: Sau khi gọi API thành công, mới setPosts
    };

    // Chuẩn bị context để truyền xuống các route con (List/Form)
    const contextValue = {
        posts: posts,
        isLoading: isLoading,
        error: error,
        addPost: addPostHandler,
        // ... thêm updatePost, deletePost vào đây
    };

    return (
        <Outlet context={contextValue} />
    );
}

export default PostLayout;



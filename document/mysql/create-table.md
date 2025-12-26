# tao bang
CREATE TABLE posts (
    -- 1. Khóa chính (Primary Key)
    id INT(11) NOT NULL AUTO_INCREMENT,
    
    -- 2. Tiêu đề bài viết (Không được để trống)
    title VARCHAR(255) NOT NULL,
    
    -- 3. Nội dung bài viết (Dùng TEXT cho nội dung dài)
    content TEXT NOT NULL,
    
    -- 4. ID của người dùng đã đăng bài (Khóa ngoại)
    user_id INT(11) NOT NULL,
    
    -- 5. Thời gian tạo bài viết
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 6. Thời gian cập nhật lần cuối
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 7. Trạng thái (Ví dụ: draft, published)
    status VARCHAR(50) DEFAULT 'published',
    
    -- Thiết lập Khóa chính
    PRIMARY KEY (id),
    
    -- Thiết lập Khóa ngoại (Giả định bạn có bảng 'users')
    -- Khóa ngoại đảm bảo user_id phải tồn tại trong bảng users
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE -- Nếu user bị xóa, các bài post của họ cũng bị xóa
        ON UPDATE CASCADE -- Nếu user id bị thay đổi, post user id cũng được cập nhật
);

# INSERT TEST
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
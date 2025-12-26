# create posst
CREATE TABLE posts (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

# INSERT TEST
INSERT INTO posts (title, content) VALUES ('post test title 1', 'post test conten 1');
# SELECT 
SELECT title, content FROM posts;
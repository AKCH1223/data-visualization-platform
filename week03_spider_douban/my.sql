CREATE TABLE douban_top100 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rank INT,
    title VARCHAR(255),
    rating FLOAT,
    quote TEXT,
    info TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

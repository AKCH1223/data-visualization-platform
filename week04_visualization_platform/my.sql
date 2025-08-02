CREATE TABLE douban_movie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    rating FLOAT,
    rank INT
);

INSERT INTO douban_movie (title, rating, rank) VALUES
('霸王别姬', 9.6, 1),
('肖申克的救赎', 9.7, 2),
('阿甘正传', 9.5, 3),
('美丽人生', 9.5, 4),
('泰坦尼克号', 9.4, 5),
('千与千寻', 9.4, 6),
('辛德勒的名单', 9.5, 7),
('盗梦空间', 9.3, 8),
('海上钢琴师', 9.3, 9),
('楚门的世界', 9.2, 10);

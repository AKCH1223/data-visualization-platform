CREATE DATABASE IF NOT EXISTS movie_db DEFAULT CHARSET utf8mb4;
USE movie_db;

CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    rating FLOAT
);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO movies (title, rating) VALUES
('电影A', 8.2),
('电影B', 7.6),
('电影C', 9.1),
('电影D', 6.9),
('电影E', 7.3);


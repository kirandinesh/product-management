CREATE DATABASE IF NOT EXISTS product_management;
USE product_management;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userEmail VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (userEmail, password)
VALUES ('admin@gmail.com', 'admin@123');

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, quantity) VALUES
('iPhone 15', 79999.00, 10),
('Samsung Galaxy S23', 69999.00, 15),
('MacBook Air M2', 114999.00, 5),
('Mechanical Keyboard', 7499.00, 18),
('External SSD 1TB', 8999.00, 30);

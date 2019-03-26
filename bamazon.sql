DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

SELECT * FROM products;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot", "Electronics", 39.99, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Essential Oil Diffuser", "Home Fragrance", 16.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("What Do You Meme", "Game", 29.97, 120);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Crocs Classic Clog", "Shoes", 12.99, 200);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick 4K", "Electronics", 49.99, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Keurig K-Classic", "Kitchen", 109.99, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("ZonLi Weighted Blanket", "Home Decor", 65.50, 75);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Futon Sofa", "Furniture", 129.99, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Woodburning Firepit", "Garden", 79.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Kindle E-reader", "Electronics", 99.99, 100);
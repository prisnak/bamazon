DROP DATABASE bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NOT NULL,
	price DECIMAL (10,2) DEFAULT true,
	stock_quantity DECIMAL (10) DEFAULT true,
	PRIMARY KEY (item_id)
);

SELECT *
FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Uncharted 4", "Video Games", 49.95, 150),
  ("DOOM", "Video Games", 59.99, 200),
  ("Crate of Spam", "Food and Drink", 24.50, 50),
  ("Cool Shades", "Apparel", 75.00, 5),
  ("Worn Denim Jeans", "Apparel", 54.25, 35),
  ("Survival Towel", "Necessities", 42.42, 42),
  ("Bill and Ted's Excellent Adventure", "Films", 15.00, 25),
  ("Mad Max: Fury Road", "Films", 25.50, 57),
  ("Monopoly", "Board Games", 30.50, 35),
  ("Yahtzee", "Board Games", 19.95, 23);
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_date DATE
);

INSERT INTO books (title, author, published_date) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10');
INSERT INTO books (title, author, published_date) VALUES ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11');
INSERT INTO books (title, author, published_date) VALUES ('1984', 'George Orwell', '1949-06-08');
INSERT INTO books (title, author, published_date) VALUES ('Pride and Prejudice', 'Jane Austen', '1813-01-28');
INSERT INTO books (title, author, published_date) VALUES ('The Catcher in the Rye', 'J.D. Salinger', '1951-07-16');
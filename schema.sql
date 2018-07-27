DROP DATABASE IF EXISTS users;

CREATE DATABASE users;

USE users;

CREATE TABLE userLog (
  id int NOT NULL AUTO_INCREMENT,
  user varchar(50),
  passW varchar(50),
  PRIMARY KEY (ID)
);

CREATE TABLE meals (
  id int NOT NULL AUTO_INCREMENT,
  date DATE,
  food_item varchar(250),
  userID int
  PRIMARY KEY(ID)
)

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

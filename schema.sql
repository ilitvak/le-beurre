DROP DATABASE IF EXISTS users;

CREATE DATABASE users;

USE users;

CREATE TABLE userLog (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50),
  password varchar(50),
  PRIMARY KEY (ID)
);

CREATE TABLE meals (
  food_item varchar(250),
  username varchar(50),
  userID int NOT NULL,
  Primary KEY (userID)
)

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
DROP DATABASE IF EXISTS users;

CREATE DATABASE users;

USE users;

CREATE TABLE userLog (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50),
  password varchar(50),
  PRIMARY KEY (ID),

  -- checks if username is unique 
  UNIQUE KEY username (username)
);

-- CREATE TABLE meals (
--   id int NOT NULL AUTO_INCREMENT,
--   date DATE,
--   food_item varchar(250),
--   userID int
--   PRIMARY KEY(ID)
-- )

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
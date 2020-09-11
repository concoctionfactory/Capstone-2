DROP DATABASE IF EXISTS  workflow;
CREATE DATABASE workflow;

\c workflow

CREATE TABLE users (
    username TEXT UNIQUE NOT NULL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    password TEXT NOT NULL,
    email TEXT
);

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE boardMemebers (
    board_id INTEGER NOT NULL REFERENCES boards ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    is_admin BOOLEAN NOT NULL default FALSE,
    PRIMARY KEY(board_id, username)
);

CREATE TABLE boardActivity (
    board_id INTEGER NOT NULL REFERENCES boards ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    changed_at TIMESTAMP DEFAULT current_timestamp,
    action TEXT NOT NULL,
    PRIMARY KEY(board_id, username)
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    board_id INTEGER NOT NULL REFERENCES boards ON DELETE CASCADE
);


CREATE TABLE listActivity (
    list_id INTEGER NOT NULL REFERENCES lists ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    changed_at TIMESTAMP DEFAULT current_timestamp,
    action TEXT NOT NULL,
    PRIMARY KEY(list_id, username)
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    due_Date TIMESTAMP,
    is_done BOOLEAN NOT NULL default FALSE,
    list_id INTEGER NOT NULL REFERENCES lists ON DELETE CASCADE
);

CREATE TABLE cardMemeber (
    card_id INTEGER NOT NULL REFERENCES cards ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY(card_id, username)
);





INSERT INTO users
  (username, first_name, last_name, password, email)
  VALUES
  ( 'Alex_Ant', 'Alex', 'Ant', 123, 'alex_ant@gmail.com'),
  ( 'Beth_Bat', 'Beth', 'Bat', 123, 'beth_bat@gmail.com'),
  ( 'Carl_cat', 'Carl', 'Cat', 123, 'carl_cat@gmail.com');


INSERT INTO boards
  (id, name)
  VALUES
  (91, 'new project'),
  (92, 'old project');

INSERT INTO boardMemebers
  (board_id, username, is_admin)
  VALUES
    (91, 'Alex_Ant', true),
    (91,'Beth_Bat', false),
    (92, 'Alex_Ant', true),
    (92,'Beth_Bat', false),
    (92, 'Carl_cat', false);




  INSERT INTO lists
  (id, name, board_id)
  VALUES
  (91, 'product', 91),
  (92, 'packaging', 91),
  (93, 'website', 92);





INSERT INTO cards
  (id, name, is_done, list_id)
  VALUES
  (91, 'create cad', true, 91),
  (92, 'sketch product',false, 91),
  (93, 'render packaging',false, 92);

  
INSERT INTO cardMemeber
  (card_id, username)
  VALUES
    (91, 'Alex_Ant'),
    (92, 'Beth_Bat');

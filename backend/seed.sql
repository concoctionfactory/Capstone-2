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

CREATE TABLE boardMembers (
    board_id INTEGER NOT NULL REFERENCES boards ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    is_admin BOOLEAN NOT NULL DEFAULT  FALSE,
    PRIMARY KEY(board_id, username)
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    board_id INTEGER NOT NULL REFERENCES boards ON DELETE CASCADE
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    text TEXT,
    due_date DATE,
    status TEXT DEFAULT 'not_started' CHECK ( status IN ('not_started','in_progress','completed')),
    list_id INTEGER NOT NULL REFERENCES lists ON DELETE CASCADE
);

CREATE TABLE cardMember (
    card_id INTEGER NOT NULL REFERENCES cards ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY(card_id, username)
);


CREATE TABLE activity (
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    type TEXT, CHECK ( type in ('boards','lists','cards')),
    id INTEGER,
    change TEXT NOT NULL,
    time_stamp TIMESTAMP DEFAULT current_timestamp,
    PRIMARY KEY(username)
);

INSERT INTO users
  (username, first_name, last_name, email,password)
  VALUES
  ( 'alex_ant', 'Alex', 'Ant', 'alex_ant@gmail.com','$2b$10$CXNlcLh27jfOxH6971oBs.OrCeiBrZ7xinAe.V3arjrNVqOUaolxu'),
  ( 'beth_bat', 'Beth', 'Bat', 'beth_bat@gmail.com','$2b$10$CXNlcLh27jfOxH6971oBs.OrCeiBrZ7xinAe.V3arjrNVqOUaolxu'),
  ( 'carli_cat', 'Carl', 'Cat',  'carli_cat@gmail.com','$2b$10$CXNlcLh27jfOxH6971oBs.OrCeiBrZ7xinAe.V3arjrNVqOUaolxu'),
  ( 'danny_dog', 'Danny', 'Dog', 'danny_dog@gmail.com','$2b$10$CXNlcLh27jfOxH6971oBs.OrCeiBrZ7xinAe.V3arjrNVqOUaolxu');


INSERT INTO boards
  (id, name)
  VALUES
  (91, 'ant site'),
  (92, 'bat site');

INSERT INTO boardMembers
  (board_id, username, is_admin)
  VALUES
    (91, 'alex_ant', true),
    (91,'beth_bat', false),
    (92, 'alex_ant', true),
    (92,'beth_bat', false),
    (92, 'carli_cat', false);

  INSERT INTO lists
  (id, name, board_id)
  VALUES
  (91, 'design', 91),
  (92, 'backend', 91),
  (93, 'fontend', 91),
  (94, 'testing', 92),
  (95, 'bug fixes', 92);


INSERT INTO cards
  (id, name, text, list_id, status, due_date)
  VALUES
  (91, 'create wireframe', 'use figma instead of sketch', 91,'not_started', '2020-10-1'),
  (92, 'mockup mobile','pass off using zeplin', 91,'in_progress','2020-10-6'),

  (93, 'set up database', 'use node and express', 92, 'completed','2020-10-8'),
  (94, 'test database','just basic tests', 92,'not_started','2020-10-3'),

  (95, 'write the frontend', 'use react and redux', 93, 'completed', '2020-10-1'),
  (96, 'eat tests','use the new api', 93,'in_progress', '2020-10-2'),

  (97, 'write unit test', 'use jest', 94, 'completed','2020-10-7'),
  (98, 'write intergation test','use jest' , 94,'not_started', '2020-10-1'),

  (99, 'sign in doesnt work','token wasnt saved', 95,'in_progress','2020-10-21');

  


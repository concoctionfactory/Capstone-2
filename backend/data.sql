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
    due_date TIMESTAMP,
    is_done BOOLEAN NOT NULL default FALSE,
    list_id INTEGER NOT NULL REFERENCES lists ON DELETE CASCADE
);

CREATE TABLE cardMemeber (
    card_id INTEGER NOT NULL REFERENCES cards ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY(card_id, username)
);




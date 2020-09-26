
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
-- https://www.sqlite.org/datatype3.html
-- https://www.sqlitetutorial.net/sqlite-create-table/


CREATE TABLE users(
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    user_id TEXT PRIMARY KEY, --python generated UUID
    picture_id INTEGER NOT NULL
);

CREATE TABLE posts(
    post_id INTEGER PRIMARY KEY AUTOINCREMENT, --Don't specify an id when creating a post
    post_title TEXT NOT NULL,
    post_content TEXT NOT NULL,
    upvotes INTEGER,
    date TEXT, --TEXT as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS")
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO users (username, password, user_id, picture_id) VALUES 
    ('JohnSmith99','password','12345678-1234-5678-1234-567812345678',1)
;

INSERT INTO posts (post_title, post_content, upvotes, date, user_id) VALUES 
    ('First Post','This is the conent of the first post',5,'2021-11-15 20:20:20.123','12345678-1234-5678-1234-567812345678')
;
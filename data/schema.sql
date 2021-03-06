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
    upvotes TEXT,
    downvotes TEXT,
    date TEXT, --TEXT as ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS")
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TRIGGER aft_del AFTER DELETE ON users
BEGIN
    DELETE FROM posts
    WHERE user_id = old.user_id;
END;

INSERT INTO users (username, password, user_id, picture_id) 
VALUES 
    ('JohnSmith99','password','12345678-1234-5678-1234-567812345678',1),
    ('werunm','1234','12345678-1234-5678-1234-567812345333',2),
    ('aaa','aaa','12345432428-1234-5678-1234-567812345333',3),
    ('joe','1234','12345141342148-1234-5678-1234-5345333',6)
;   

INSERT INTO posts (post_title, post_content, upvotes, downvotes, date, user_id) VALUES 
    (
        "multivote test",
        " ",
        '[38ce446c-664e-4544-850f-ea6704fc9f88, 33ce446c-664e-4544-850f-ea6704fc9f88, 38ce446c-364e-4544-850f-ea6704fc9f88]',
        '[38ce446c-664e-4544-850f-ea6704fc3f88]',
        '2011-11-15T13:20:20.123Z',
        '38ce446c-664e-4544-850f-ea6704fc9f88'
    )
;

INSERT INTO posts (post_title, post_content, upvotes, downvotes, date, user_id) VALUES 
    (
        "As you get older, what's something that becomes increasingly annoying?",
        " ",
        '[12345141342148-1234-5678-1234-5345333, 12345141342148-1234-5678-1234-5345333]',
        '[]',
        '2011-11-15T13:20:20.123Z',
        '12345678-1234-5678-1234-567812345678'
    ),
    (
        'First Post',
        'This is the conent of the first post',
        '[]',
        '[]',
        '2001-10-15T12:20:20.123Z',
        '12345678-1234-5678-1234-567812345333'
    ),
    (
        'A female Gorilla at the Taipei Zoo, trying to figure out an escape plan using a log as a stepping stone',
        'Yes. Sad was the first emotion I felt as well. Thank goodness other people are starting to see, as this being the top rated comment.',
        '[]',
        '[]',
        '2019-11-15T19:20:20.123Z',
        '12345432428-1234-5678-1234-567812345333'
    ),
    (
        'First Post',
        'Yes. Sad was the first emotion I felt as well. Thank goodness other people are starting to see, as this being the top rated comment.',
        '[]',
        '[]',
        '2019-11-15T19:20:20.123Z',
        '12345432428-1234-5678-1234-567812345333'
    ),    (
        'TIFU by showing my girlfriend my actual strength',
        'So, when my then gf and I started dating, I discovered early on that she can be quite physical. In the sense that she likes to push, hold, punch even. Bare in mind she is not actually trying to hurt me, she is just playful like that. I found this both adorable and fun, so I played along.',
        '[]',
        '[]',
        '2019-11-15T19:20:20.123Z',
        '12345432428-1234-5678-1234-567812345333'
    )
;
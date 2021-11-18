from flask import request, json, jsonify, make_response, send_from_directory
import sqlite3
import datetime

def create_response(message='',status_code=200, mimetype='application/json'):

        if isinstance(message,list):
            json_return = {}
            for i,x in enumerate(message):
                temp_json = {}
                temp_json['id'] = x[0]
                temp_json['title'] = x[1]
                temp_json['content'] = x[2]
                temp_json['upvotes'] = x[3]
                temp_json['date'] = x[4]
                temp_json['user_id'] = x[5]
                json_return[i] = temp_json

            response = make_response(json_return)
        else:
            response = make_response(message)

        response.status_code = status_code
        response.mimetype = mimetype
        return response


def get_picture_from_user_id(user_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    res = cur.fetchall()
    res = res[0]
    picture_id = res[-1]
    return picture_id

def get_user_info_by_user_id(user_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    res = cur.fetchall()
    conn.close()
    return res[0]

def get_limited_posts_for_feed(id):
    conn = sqlite3.connect('data/database.db')
    offset = 5*(int(id) - 1)
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM posts ORDER BY post_id DESC LIMIT 5 OFFSET {offset}")
    res = cur.fetchall()
    conn.close()
    return res


def insert_new_post(title,content,user_id):
    conn = sqlite3.connect('data/database.db')
    print(user_id)
    upvotes = 0
    current_utc = datetime.datetime.utcnow()
    current_utc = current_utc.strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    conn.execute("INSERT INTO posts (post_title, post_content, upvotes, date, user_id) VALUES (?,?,?,?,?)",
                (str(title), str(content), upvotes,str(current_utc), user_id))
    
    conn.commit()
    conn.close()
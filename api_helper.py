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
                temp_json['downvotes'] = x[4]
                temp_json['date'] = x[5]
                temp_json['user_id'] = x[6]
                json_return[i] = temp_json
            response = make_response(json_return)

        elif isinstance(message,tuple):
            temp_json = {}
            temp_json['username'] = message[0]
            temp_json['user_id'] = message[2]
            temp_json['picture_id'] = message[3]
            response = make_response(temp_json)
        else:
            response = make_response(message)

        response.status_code = status_code
        response.mimetype = mimetype
        return response

def get_post_from_post_id(post_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()

    cur.execute("SELECT * FROM posts WHERE post_id=?", (post_id,))
    res = cur.fetchall()
    res = res[0]
    return res

def get_post_and_user_from_post_id(post_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM posts WHERE post_id=?", (post_id,))
    post_info = cur.fetchall()
    post_info = post_info[0]
    user_info = get_user_info_by_user_id(post_info[-1])

    post_dic = generate_dict_for_post(post_info)
    user_dic = generate_dict_for_user(user_info)
    obj = dict(list(post_dic.items()) + list(user_dic.items()))

    return obj


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
    print(res)
    conn.close()
    return res

def get_limited_posts_for_profile(id, user_id):
    conn = sqlite3.connect('data/database.db')
    offset = 5*(int(id) - 1)
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM posts WHERE user_id=? ORDER BY post_id DESC LIMIT 5 OFFSET {offset}", (user_id))
    res = cur.fetchall()
    conn.close()
    return res

def insert_new_post(title,content,user_id):
    conn = sqlite3.connect('data/database.db')
    print(title,content,user_id)
    upvotes = 0
    downvotes = 0
    current_utc = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    cur = conn.cursor()
    cur.execute("INSERT INTO posts (post_title, post_content, upvotes, downvotes, date, user_id) VALUES (?,?,?,?,?)",
                (str(title), str(content), upvotes, downvotes,str(current_utc), user_id))
    new_id = cur.lastrowid
    conn.commit()
    conn.close()
    print(new_id)
    return str(new_id)

def generate_dict_for_post(res):
    obj = {
        'post_id':res[0],
        'title': res[1],
        'content': res[2],
        'upvotes': res[3],
        'downvotes':res[4],
        'date' : res[5],
        'user_id':res[6]
    }

    return obj

def generate_dict_for_user(res):
    obj = {
        'username':res[0],
        'user_id':res[2],
        'picture_id':res[3]
        }   
    return obj

def delete_user(user_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM users WHERE user_id=?", (user_id))
    res = cur.fetchall()
    cur.execute(f"DELETE FROM users WHERE user_id=?", (user_id))
    conn.close()
    return res
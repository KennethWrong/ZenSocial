from flask import request, json, jsonify, make_response, send_from_directory
import sqlite3
import datetime


def create_response(message='', status_code=200, user_id='1', mimetype='application/json'):

    if isinstance(message, list):
        json_return = {}
        for i, x in enumerate(message):
            temp_json = {}
            temp_json['id'] = x[0]
            temp_json['title'] = x[1]
            temp_json['content'] = x[2]
            temp_json['upvotes'] = len(clean_string(x[3]))
            temp_json['downvotes'] = len(clean_string(x[4]))
            # -1 for dislike, 0 for nothing, 1 for like (only used for initial load)
            temp_json['vote'] = get_prev_vote(clean_string(x[3]),clean_string(x[4]),user_id)
            temp_json['date'] = x[5]
            temp_json['user_id'] = x[6]
            json_return[i] = temp_json
        response = make_response(json_return)

    elif isinstance(message, tuple):
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



 # -1 for dislike, 0 for nothing, 1 for like (only used for initial load)
def get_prev_vote(upList, downList, voter_id):

    if voter_id in upList:
        return 1
    elif voter_id in downList:
        return -1
    else:
        return 0


def get_post_from_post_id(post_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()

    cur.execute("SELECT * FROM posts WHERE post_id=?", (post_id,))
    res = cur.fetchall()
    res = res[0]
    return res


def get_post_and_user_from_post_id(user_id, post_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM posts WHERE post_id=?", (post_id,))
    post_info = cur.fetchall()
    post_info = post_info[0]
    user_info = get_user_info_by_user_id(post_info[-1])

    post_dic = generate_dict_for_post(user_id, post_info)
    user_dic = generate_dict_for_user(user_info)
    obj = dict(list(post_dic.items()) + list(user_dic.items()))

    return obj



def get_picture_from_user_id(user_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE user_id=?", (user_id,))
    res = cur.fetchall()
    print(res)
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
    cur.execute(
        f"SELECT * FROM posts ORDER BY post_id DESC LIMIT 5 OFFSET {offset}")
    res = cur.fetchall()
    print(res)
    conn.close()
    return res


def get_limited_posts_for_profile(user_id, id):
    conn = sqlite3.connect('data/database.db')
    offset = 5*(int(id) - 1)
    cur = conn.cursor()
    cur.execute(
        f"SELECT * FROM posts WHERE user_id=? ORDER BY post_id DESC LIMIT 5 OFFSET {offset}", [str(user_id)])
    res = cur.fetchall()
    print(res)
    conn.close()
    return res


def insert_new_post(title, content, user_id):
    conn = sqlite3.connect('data/database.db')
    print(title, content, user_id)
    upvotes = []
    downvotes = []
    current_utc = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    cur = conn.cursor()
    cur.execute("INSERT INTO posts (post_title, post_content, upvotes, downvotes, date, user_id) VALUES (?,?,?,?,?,?)",
                (str(title), str(content), str(upvotes), str(downvotes), str(current_utc), user_id))
    new_id = cur.lastrowid
    conn.commit()
    conn.close()
    print(new_id)
    return str(new_id)


def clean_string(string):
    x = string.replace('[', '').replace(']', '').replace('\'', '').replace('\"', '').replace(' ', '')

    x = x.split(',')

    if '' in x:
        x.remove('')

    return x


def generate_dict_for_post(user_id, res):
    obj = {
        'post_id': res[0],
        'title': res[1],
        'content': res[2],
        'upvotes': len(clean_string(res[3])),
        'downvotes': len(clean_string(res[4])),
        'vote' : get_prev_vote(clean_string(res[3]),clean_string(res[4]),user_id),
        'date': res[5],
        'user_id': res[6]
    }

    return obj


def generate_dict_for_user(res):
    obj = {
        'username': res[0],
        'user_id': res[2],
        'picture_id': res[3]
    }
    return obj

#Handle upvote logic
def upvote(user_id, post_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute(f"SELECT upvotes, downvotes FROM posts WHERE post_id=?", (post_id,))
    vote_info = cur.fetchall()
    vote_info = vote_info[0]
    re_obj = 0
    upvotes = clean_string(vote_info[0])
    downvotes = clean_string(vote_info[1])

    if user_id in upvotes:
        upvotes.remove(user_id)
    elif user_id in downvotes:
        downvotes.remove(user_id)
        upvotes.append(user_id)
        re_obj = 1
    else:
        upvotes.append(user_id)
        re_obj = 1
    
    #update the upvotes & downvotes columns from the post
    cur.execute(f"UPDATE posts SET upvotes = ?, downvotes = ? WHERE post_id=?", (str(upvotes), str(downvotes), post_id,))
    conn.commit()
    conn.close()

    u_count = len(upvotes)
    d_count = len(downvotes)
    return_obj = {
        'upvotes':u_count,
        'downvotes':d_count,
        'vote':re_obj
    }

    return return_obj

#Handle downvote logic
def downvote(user_id, post_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute(f"SELECT upvotes, downvotes FROM posts WHERE post_id=?", (post_id,))
    vote_info = cur.fetchall()
    vote_info = vote_info[0]
    re_obj = 0
    upvotes = clean_string(vote_info[0])
    downvotes = clean_string(vote_info[1])

    if user_id in downvotes:
        downvotes.remove(user_id)
    elif user_id in upvotes:
        upvotes.remove(user_id)
        downvotes.append(user_id)
        re_obj = -1
    else:
        downvotes.append(user_id)
        re_obj = -1

    #update the upvotes & downvotes columns from the post
    cur.execute(f"UPDATE posts SET upvotes = ?, downvotes = ? WHERE post_id=?", (str(upvotes), str(downvotes), post_id,))
    conn.commit()
    conn.close()
    
    u_count = len(upvotes)
    d_count = len(downvotes)
    return_obj = {
        'upvotes':u_count,
        'downvotes':d_count,
        'vote':re_obj
    }
    return return_obj


def delete_user_by_user_id(user_id):
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM users WHERE user_id=?", (user_id,))
    res = cur.fetchall()
    cur.execute(f"DELETE FROM users WHERE user_id=?", (user_id,))
    conn.commit()
    cur.execute(f"DELETE FROM posts WHERE user_id=?", (user_id,))
    conn.commit()
    conn.close()
    return res


def change_user_password_by_user_id(user_id, password):
    sql = '''UPDATE users
             SET password = ?
             WHERE user_id = ?'''

    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute(sql, (password, user_id))
    conn.commit()
    conn.close()
    return 'Password has been successfully updated'

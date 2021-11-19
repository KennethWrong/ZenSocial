import sqlite3
import uuid
from flask import Flask, request, json, jsonify, send_from_directory, send_file
from flask.helpers import make_response
from flask_cors import CORS  # comment this on deployment
import api_helper

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment

# This is only for deployment
# @app.route('/')
# def home():
#     return send_from_directory(app.static_folder,'index.html')

@app.route('/register', methods=['POST'])
def register():

    content = request.json

    username = content['username']
    password = content['password']

    if len(username) == 0 or len(password) == 0:
        response = api_helper.create_response('Username or password can not be empty',400)
        return response
    elif len(username.strip()) < 3 or len(password.strip()) < 3:
        response = api_helper.create_response('Username or password must have at least 3 characters',400)
        return response


    user_id = str(uuid.uuid4())
    picture_id = content['picture_id']
    print(picture_id)

    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    print("Opened database successfully")

    #check if data is duplicated or not
    cur.execute("SELECT * FROM users WHERE username=?",(username,))
    res = cur.fetchall()

    if res:
        response = api_helper.create_response('Username already exists',400)
        return response

    conn.execute("INSERT INTO users (username, password, user_id, picture_id) VALUES (?,?,?,?)",
                 (username, password, user_id, picture_id))
    conn.commit()
    print("Operation done successfully")
    conn.close()

    response = api_helper.create_response(user_id)

    return response

@app.route('/login', methods=['POST'])
def login():

    content = request.json

    username = content['username']
    password = content['password']

    if len(username) == 0 or len(password) == 0:
        response = api_helper.create_response('Username or password can not be empty',400)
        return response

    conn = sqlite3.connect('data/database.db')
    print("Opened database successfully")
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE username=?", (username,))
    res = cur.fetchall()
    conn.close()

    if len(res) == 0:
        response = api_helper.create_response('Username does not exist',400)
        return response
    
    user_info = res[0]
    user_password = user_info[1]
    user_id = user_info[2]

    if user_password == password:
        response = api_helper.create_response(user_id)
        return response
    else:
        response = api_helper.create_response('Username or password is incorrect',400)
        return response

@app.route('/feed/<int:page>',methods=['GET'])
def send_feed(page):
    res = api_helper.get_limited_posts_for_feed(page)
    response = api_helper.create_response(res,200)
    return response

@app.route('/post/create_post', methods=["POST"])
def create_new_post():
    contents = request.json
    title = contents['title']
    content = contents['content']
    user_id = contents['user_id']

    res = api_helper.insert_new_post(title,content,user_id)
    response = api_helper.create_response(res)
    return response

@app.route('/post/<post_id>', methods=['GET'])
def get_post_by_id(post_id):
    post = api_helper.get_post_and_user_from_post_id(post_id)
    print(post)
    response = make_response(post)
    response.status_code = 200
    response.mimetype = 'application/json'
    return response

@app.route('/assets/picture/allpicture/<number>', methods=["GET"])
def get_specific_pictures(number):
    return send_file(f"./assets/{number}.png", mimetype='image')


@app.route('/assets/picture/<user_id>', methods=['GET'])
def get_user_picture_by_user_id(user_id):
    picture_id = api_helper.get_picture_from_user_id(user_id)
    return send_file(f"./assets/{picture_id}.png", mimetype='image')

@app.route('/users/<user_id>', methods=["GET"])
def get_user_info_by_user_id(user_id):
    user_info = api_helper.get_user_info_by_user_id(user_id)
    return api_helper.create_response(user_info,200)

if __name__ == '__main__':
    app.run(debug=True)

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

#For users to register
@app.route('/register', methods=['POST'])
def register():

    content = request.json

    #User params to enter
    username = content['username']
    password = content['password']
    picture_id = content['picture_id']
    user_id = str(uuid.uuid4())

    if len(username) == 0 or len(password) == 0:
        response = api_helper.create_response('Username or password can not be empty',400)
        return response
    elif len(username.strip()) < 3 or len(password.strip()) < 3:
        response = api_helper.create_response('Username or password must have at least 3 characters',400)
        return response


    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()

    #check if username is duplicated or not
    cur.execute("SELECT * FROM users WHERE username=?",(username,))
    res = cur.fetchall()

    if res:
        response = api_helper.create_response('Username already exists',400)
        return response

    #Inserting new user after checking username is unique
    conn.execute("INSERT INTO users (username, password, user_id, picture_id) VALUES (?,?,?,?)",
                 (username, password, user_id, picture_id))
    conn.commit()
    conn.close()

    #api_helper is python helper file i created to modulate logic 
    response = api_helper.create_response(user_id)

    return response

#API to handle uesr login
@app.route('/login', methods=['POST'])
def login():

    #Parse user information
    content = request.json
    username = content['username']
    password = content['password']

    #Check if given user information is invalid
    if len(username) == 0 or len(password) == 0:
        response = api_helper.create_response('Username or password can not be empty',400)
        return response

    #Fetch user details from given username to check if password is correct
    conn = sqlite3.connect('data/database.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username=?", (username,))
    res = cur.fetchall()
    conn.close()

    #If no match, return 404
    if len(res) == 0:
        response = api_helper.create_response('Username does not exist',400)
        return response
    
    #Parse retrieved user_info from database if username exists
    user_info = res[0]
    user_password = user_info[1]
    user_id = user_info[2]

    #Check if password equals
    if user_password == password:
        response = api_helper.create_response(user_id)
        return response
    else:
        response = api_helper.create_response('Username or password is incorrect',400)
        return response

#API to get feed 
@app.route('/feed/<int:page>',methods=['GET'])
def send_feed(page):
    res = api_helper.get_limited_posts_for_feed(page)
    response = api_helper.create_response(res,200)
    return response

@app.route('/profile/<user_id>/<int:page>',methods=['GET'])
def send_profile(user_id, page):
    res = api_helper.get_limited_posts_for_profile(user_id, page)
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

@app.route('/delete/<user_id>', methods=["GET"])
def delete_user_by_user_id(user_id):
    user_info = api_helper.delete_user_info_by_user_id(user_id)
    return api_helper.create_response(user_info,200)

if __name__ == '__main__':
    app.run(debug=True)

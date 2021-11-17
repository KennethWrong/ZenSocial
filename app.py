import sqlite3
import uuid
from flask import Flask, request, json, jsonify, send_from_directory, make_response
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


if __name__ == '__main__':
    app.run(debug=True)

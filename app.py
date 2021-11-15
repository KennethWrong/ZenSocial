import sqlite3
import uuid
from flask import Flask, request, json, jsonify, send_from_directory
from flask_cors import CORS  # comment this on deployment

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment

# This is only for deployment
# @app.route('/')
# def home():
#     return send_from_directory(app.static_folder,'index.html')


@app.route('/')
def home():
    return 'Hello there.'


@app.route('/register', methods=['POST'])
def register():

    content = request.json

    username = content['username']
    password = content['password']
    user_id = str(uuid.uuid4())
    picture_id = content['picture_id']

    print('content', content)

    conn = sqlite3.connect('data/database.db')
    print("Opened database successfully")
    conn.execute("INSERT INTO users (username, password, user_id, picture_id) VALUES (?,?,?,?)",
                 (username, password, user_id, picture_id))
    conn.commit()
    print("Operation done successfully")
    conn.close()

    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True)

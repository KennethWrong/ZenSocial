import requests

res = requests.post(
    'http://localhost:5000/register', json={"username": "Mike", "password": "pswrd", "picture_id": 1})
if res.ok:
    print(res.json())

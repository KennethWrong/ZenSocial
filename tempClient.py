import requests

# res = requests.post(
#     'http://localhost:5000/register', json={"username": "Mike", "password": "pswrd", "picture_id": 1})
# if res.ok:
#     print(res.json())

def cleanString(string):
    x = string.replace('[', '').replace(']', '').replace('\'','').replace('\"','').replace(' ', '')

    print('cleaned', x)
    
    x = x.split(',')

    print('split', x)

    if '' in x:
        x.remove('')

    return x

ups = ['1', '1234']
downs = []

print('ups', ups)
print('downs', downs)


string_ups = str(ups)
print('string_ups', string_ups)
string_downs = str(downs)
print('string_downs', string_downs)


y = cleanString(string_ups)
z = cleanString(string_downs)
# y = y.split(',')
# if y.index('') > -1:
#     y.remove('')
print('y', y, 'z', z)

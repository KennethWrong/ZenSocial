# ZenSocial by Techleads team

### *Before running anything do `npm install`*

### To run flask back-end 
- click start on vs code

### To run react front-end
- `npm run start`

## API description
### Endpoint: /register | Method: POST
Takes parameters from the request json and attempts to create a new user with the requested information. This function will handle bad input such as an empty password or a username that already exists. The API will then either send an appropriate error message back or a success message after creating the user.
### Endpoint: /login | Method: POST
Similar in function to the `/register` endpoint but this endpoint only checks if there is a user in the database users table with matching credentials from the request.
### Endpoint: /feed/<user_id>/\<int:page> | Method: GET
This endpoint gets a maximum of 5 posts from the database and selects which ones to return by offsetting by the page input
### Endpoint: /profile/<user_id>/\<int:page> | Method: GET
Very similar to the feed page but the database select statement is filtered by posts where the user_id matches
### Endpoint: /post/create_post | Method: POST
This endpoint gets the title, content, and user_id from the request json and creates a new row in the posts table, manufacturing all the required default data like upvotes
### Endpoint: /post/<user_id>/\<post_id> | Method: GET
This method selects a specific post by post_id so that the front end can  open it for full screen viewing. The user_id is used to determine the user's previous voting status on the post (if any)
### Endpoint: /upvote/<user_id>/\<post_id> | Method: PUT
This method gets the upvote and downvote lists from a specific post in the post table and determines if the user has previously voted before. If the user has previously upvoted, remove the upvote. If the user has previously downvoted, remove the downvote and add an upvote. If the user has not voted, add an upvote. 
### Endpoint: /downvote/<user_id>/\<post_id> | Method: PUT
The same as the `/upvote/<user_id>/\<post_id>` endpoint but flipped for downvoting.
### Endpoint: /assets/picture/allpicture/\<number> | Method: GET
This endpoint returns the filepath of the picture with the corresponding number input that the frontend is requesting.
### Endpoint: /assets/picture/\<user_id> | Method: GET
This endpoint gets the picture_id from a user in the user table and returns the filepath of that picture.
### Endpoint: /users/\<user_id> | Method: GET
This endpoint gets the all user information from the users table that corresponds with the user_id.
### Endpoint: /delete/profile/\<user_id> | Method: DELETE
This endpoint deletes all rows from the users and posts table where the user_id column value matches the requested id.
### Endpoint: /user/\<user_id>/password/change | Method: PUT
This endpoint checks to make sure the password and confirm password match, it also makes sure the password conforms to other requirements and returns a response based on if the password change was successful or not. The value of the password for the corresponding user will be updated in the users table
## Schema description
### Table: users
*  username: text
* password: text
* user_id: text & primary key, this is a python generated UUID
* picture_id: integer, this holds the avatar id that the user selected
### Table: posts
* post_id: integer, primary key, & autoincrement (don't need to supply this)
* post_title: text
* post_content: text
* upvotes: text, this is a stringified array of user_id's that have upvoted the post
* downvotes: text, this is a stringified array of user_id's that have downvoted the post
* date: text (ISO8601 strings ("YYYY-MM-DD HH:MM:SS.SSS")
* user_id: text (foreign key constrained from users table)

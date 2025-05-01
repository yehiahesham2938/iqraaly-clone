1. Register New User
Endpoint:** `POST /auth/register
{
  "username": "newuser",
  "email": "user@iqraaly.com",
  "password": "Password@123"
}

2. User Login
Endpoint: POST /auth/login
{
  "email": "user@iqraaly.com",
  "password": "Password@123"
}

3-  Get Profile
*GET /auth/profile*
*Headers:*  
Authorization: Bearer <token>


4- Add Audiobook (Admin)
*POST /audiobooks*  
{
  "title": "Sample Book",
  "author": "Author",
  "file_url": "http://example.com/1.mp3",
  "duration": 3600
}

5-Get All Audiobooks
GET /audiobooks

6- Get Single Audiobook
Endpoint: GET /audiobooks/:id
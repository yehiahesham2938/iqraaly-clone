require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db'); 
const app = express();
app.use(express.json()); 


mongoose.connect(db.url, db.options)
  .then(() => {
    console.log(`Connected successfully toDB:`, db.url);
    
    const User = require('./models/user');
    User.create({
      username: 'yehia',
      email: 'yehia@iqraaly.com',
      password: 'yehia'
    }).then(user => {
      console.log('yehia user created:', user.username);
    });
  })
  .catch(err => console.error('DB connection error:', err));

app.get('/', (request, response) => {
  response.send('Backend is Running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port: `, PORT);});
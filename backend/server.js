require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db'); 
const User = require('../backend/models/user');
const Audiobook = require('./models/audioBook'); // Import the Audiobook model
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors());

//Auth route
app.use('/api/auth', require('./routes/authRoutes'));
//content route
app.use('/api/audiobooks', require('./routes/contentRoutes'));
// mongoose.connect(db.url, db.options)
//   .then(() => {
//     console.log(`Connected successfully toDB:`, db.url);
    
//     const User = require('./models/user');
//     User.create({
//       username: 'yehia',
//       email: 'yehia@iqraaly.com',
//       password: 'yehia'
//     }).then(user => {
//       console.log('yehia user created:', user.username);
//     });
//   })
//   .catch(err => console.error('DB connection error:', err));

mongoose.connect(db.url, db.options)
  .then(() => console.log('db connected'))
  .catch(err => console.error('db connection error:', err));


  const createAdmin = async () => {
    const adminExists = await User.findOne({ email: "admin@iqraaly.com" });
    if (!adminExists) {
      await User.create({
        username: "admin",
        email: "admin@iqraaly.com",
        password: "Admin123",
        subscription_status: "admin"
      });
      console.log("Admin user created");
    }
  };
  createAdmin();

 

seedAudiobooks();

app.get('/', (request, response) => {
  response.send('Backend is Running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port: `, PORT);});
console.log('Available routes:');
console.log('POST /api/auth/register');
console.log('POST /api/auth/login');
console.log('GET /api/auth/profile (protected)');
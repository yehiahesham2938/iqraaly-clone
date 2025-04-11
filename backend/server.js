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

 
  const audioBooksInsertTest = async () => {
    const audiobooksExist = await Audiobook.find();
    if (audiobooksExist.length === 0) {
      const sampleAudiobooks = [
        {
          title: 'Audio Test1',
          author: 'Yehia',
          file_url: 'https://file-examples.com/storage/fee47d30d267f6756977e34/2017/11/file_example_MP3_2MG.mp3',
          duration: 120,
          category: 'Action',
        },
        {
          title: 'Audio Test 2',
          author: 'Yehia',
          file_url: 'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_5MB_MP3.mp3',
          duration: 300,
          category: 'Comediy',
        },
      ];
  
      await Audiobook.insertMany(sampleAudiobooks);
      console.log('added to the database');
    } else {
      console.log('Already db have audiobooks');
    }
  };
  
  audioBooksInsertTest();
app.get('/', (request, response) => {
  response.send('Backend is Running');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port: `, PORT);});
console.log('Available routes:');
console.log('POST /api/auth/register');
console.log('POST /api/auth/login');
console.log('GET /api/auth/profile (protected)');
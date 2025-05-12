require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db'); 
const User = require('./models/user');
const Audiobook = require('./models/audioBook'); 
const cors = require('cors');

const app = express();

  
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

  
console.log('Environment variables loaded:', {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Present' : 'Missing',
  NODE_ENV: process.env.NODE_ENV
});

  
app.use('/api/auth', require('./routes/authRoutes'));
  
app.use('/api/audiobooks', require('./routes/contentRoutes'));
  
app.use('/api/chat', require('./routes/chatRoutes'));
  
app.use('/api/ratings', require('./routes/ratingRoutes')); 

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
  const existingAudiobooks = await Audiobook.find();
  if (existingAudiobooks.length === 0) {
    const sampleAudiobooks = [
      {
        _id: "681e131493c2968564b5e055",
        title: "جنينة المحروقي",
        author: "يحيى صفوت",
        file_url: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_5MB_MP3.mp3",
        duration: 4200,
        category: "Drama",
        comments: "test",
        cover: "https://images.media.iqraaly.com:444/users/1/shows/3073_1743298285.jpg",
        rating: 4.8,
        reviews: 62,
        createdAt: new Date("2025-05-09T14:37:08.545Z"),
        updatedAt: new Date("2025-05-09T14:37:08.545Z"),
      },
      {
        _id: "67f94eba63ae84d368fa5c75",
        title: "Valid Audio(2)",
        author: "yehia",
        file_url: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_5MB_MP3.mp3",
        duration: 4800,
        cover: "https://images.media.iqraaly.com:444/users/1/shows/3065_1743036919.jpg",
        createdAt: new Date("2025-04-11T17:17:46.908Z"),
        updatedAt: new Date("2025-04-11T17:17:46.908Z"),
      },
      {
        _id: "681e131493c2968564b5e054",
        title: "هاتف وثلاث جثث - الكتاب الأول",
        author: "يارا رضوان",
        file_url: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_5MB_MP3.mp3",
        duration: 3600,
        category: "Fiction",
        comments: "test",
        cover: "https://images.media.iqraaly.com:444/users/1/shows/3065_1743036919.jpg",
        rating: 4.6,
        reviews: 135,
        createdAt: new Date("2025-05-09T14:37:08.543Z"),
        updatedAt: new Date("2025-05-09T14:37:08.543Z"),
      },
      {
        _id: "681e131493c2968564b5e056",
        title: "أوراق شمعون المصري",
        author: "أسامة عبد الرؤف الشاذلي",
        file_url: "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_5MB_MP3.mp3",
        duration: 4800,
        category: "Mystery",
        comments: "test",
        cover: "https://images.media.iqraaly.com:444/users/1/shows/3002_1738774473.jpg",
        rating: 4.7,
        reviews: 194,
        createdAt: new Date("2025-05-09T14:37:08.545Z"),
        updatedAt: new Date("2025-05-09T14:37:08.545Z"),
      }
    ];

    await Audiobook.insertMany(sampleAudiobooks);
    console.log("Sample audiobooks added to the database.");
  } else {
    console.log("Audiobooks already exist in the database.");
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
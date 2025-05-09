const mongoose = require('mongoose');
const Audiobook = require('./models/audioBook');

const sampleMostListenedBooks = [
  {
    title: 'هاتف وثلاث جثث - الكتاب الأول',
    author: 'يارا رضوان',
    cover: 'https://images.media.iqraaly.com:444/users/1/shows/3065_1743036919.jpg'
  },
  {
    title: 'جنينة المحروقي',
    author: 'يحيى صفوت',
    cover: 'https://images.media.iqraaly.com:444/users/1/shows/3073_1743298285.jpg'
  },
  {
    title: 'أوراق شمعون المصري',
    author: 'أسامة عبد الرؤف الشاذلي',
    cover: 'https://images.media.iqraaly.com:444/users/1/shows/3002_1738774473.jpg'
  }
];

// Fill additional required fields
const enrichedBooks = sampleMostListenedBooks.map((book, index) => ({
  title: book.title,
  author: book.author,
  cover: book.cover,
  rating: (4.0 + Math.random()).toFixed(1),  // e.g., 4.2 - 5.0
  reviews: Math.floor(Math.random() * 150) + 50, // 50–200
  file_url: `http://example.com/audio${index + 1}.mp3`,
  duration: (3600 + index * 600), // 3600s, 4200s, ...
  category: ['Fiction', 'Drama', 'Mystery'][index % 3],
  comments: 'test'
}));

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/iqraaly');
    console.log('Connected to MongoDB');

    await Audiobook.insertMany(enrichedBooks);
    console.log('Sample most listened books inserted successfully into `audiobooks` collection');
  } catch (err) {
    console.error('Error inserting audiobooks:', err);
  } finally {
    mongoose.connection.close();
  }
})();

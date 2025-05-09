// const mongoose = require('mongoose');
// const User = require('./models/user');  
// mongoose.connect('mongodb://127.0.0.1:27017/iqraaly', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Connected to the database');

//     await User.updateMany(
//       { profile_picture: { $exists: false } },
//       { $set: { profile_picture: null } }
//     );

//     mongoose.disconnect();
//   })
//   .catch(err => console.error('Database connection error:', err));
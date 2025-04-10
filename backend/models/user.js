const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true,unique: true  },
  email: {  type: String,required: true,unique: true },
  password: { type: String, required: true},
  profile_picture: String,
  subscription_status: {type: String, enum: ['free', 'premium'],default: 'free'}
}, { timestamps: true });



UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
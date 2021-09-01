const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' Name is required'],
  },
  email: {
    type: String,
    reuired: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

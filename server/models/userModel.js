const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password'],
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.methods.checkPassword = async function (
  currentPassword,
  dbPassword
) {
  return await bcrypt.compare(currentPassword, dbPassword);
};

userSchema.methods.isPasswordChanged = function (tokenTimestamp) {
  if (this.passwordChangedAt) {
    const passChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return tokenTimestamp < passChangeTime;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

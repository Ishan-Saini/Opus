const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncUtility = require('../util/AsyncUtility');
const ErrorUtility = require('../util/ErrorUtilityClass');

exports.signup = asyncUtility(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(201).json({
    status: 'success',
    token,
    user: newUser,
  });
});

exports.login = asyncUtility(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new ErrorUtility('Please provide both email and password', 400)
    );

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new ErrorUtility('Incorrect email or password', 401));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = asyncUtility(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token is present
  if (!token) {
    return next(new ErrorUtility('Please login again!', 401));
  }

  // Promisify to convert callback based function to promise based
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // Check if user was deleted after issuing of token
  const loggedInUser = await User.findById(decoded.id);

  if (!loggedInUser)
    return next(new ErrorUtility('This user has been deleted!', 401));

  if (loggedInUser.isPasswordChanged(decoded.iat)) {
    return next(
      new ErrorUtility(
        'Password has been changed recently, please log in again!',
        401
      )
    );
  }

  req.user = loggedInUser;
  next();
});

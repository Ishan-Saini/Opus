const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const asyncUtility = require('../util/AsyncUtility');
const ErrorUtility = require('../util/ErrorUtilityClass');
const sendEmail = require('../util/SendEmail');

const generateToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = asyncUtility(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  generateToken(newUser, 201, res);
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

  generateToken(user, 200, res);
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

exports.forgotPassword = asyncUtility(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new ErrorUtility('User not found.', 404));

  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Did you request to reset your password? You can do this by clicking on the link : ${resetUrl} (valid for 10 minutes). If this wasn't you then please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'OPUS | Reset password',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
  } catch {
    user.passwordResetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorUtility(
        'Something went wrong while sending the email. Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = asyncUtility(async (req, res, next) => {
  const encryptedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: encryptedToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user)
    return next(new ErrorUtility('Token is not valid or has expired.', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  generateToken(user, 200, res);
});

exports.updatePassword = asyncUtility(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.checkPassword(req.body.currentPassword, user.password)))
    return next(new ErrorUtility('Password is incorrect.', 401));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  generateToken(user, 200, res);
});

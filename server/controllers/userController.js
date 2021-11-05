const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncUtility = require('../util/AsyncUtility');
const ErrorUtility = require('../util/ErrorUtilityClass');

const filterFields = (obj, ...fields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (fields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

exports.checkUser = asyncUtility(async (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

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

    res.status(200).json({
      message: 'success',
      data: {
        user: loggedInUser,
      },
    });
  } else {
    return next(new ErrorUtility('Please login!', 401));
  }
});

exports.updateProfile = asyncUtility(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new ErrorUtility(
        'This is not the right route for updating your password. Use /updatePassword.',
        400
      )
    );

  const filteredObj = filterFields(req.body, 'email', 'name');
  const user = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteAccount = asyncUtility(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

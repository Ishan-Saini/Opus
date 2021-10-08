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

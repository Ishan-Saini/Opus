const ErrorUtility = require('../util/ErrorUtilityClass');

const jwtErrorHandler = () =>
  new ErrorUtility('Invalid Token. Please log in again!', 401);

const jwtExpiryErrorHandler = () =>
  new ErrorUtility('Token has expired. Please log in again!', 401);

const castErrorHandler = (error) =>
  new ErrorUtility(`Invalid ${error.path} : ${error.value}`, 400);

const duplicateKeyErrorHandler = (error) => {
  const keyValue = error.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  return new ErrorUtility(
    `Value : ${keyValue} already exists. Please use some other value.`,
    400
  );
};

const validationErrorHandler = (error) => {
  const messages = Object.values(error.errors)
    .map((err) => err.message)
    .join('. ');

  return new ErrorUtility(messages, 400);
};

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const productionError = (err, res) => {
  if (err.isOperational === true) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error : ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    developmentError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error;
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    error = Object.assign(err);
    if (error.name === 'JsonWebTokenError') error = jwtErrorHandler();
    if (error.name === 'TokenExpiredError') error = jwtExpiryErrorHandler();
    if (error.name === 'CastError') error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === 'ValidationError') error = validationErrorHandler(error);

    productionError(error, res);
  }
};

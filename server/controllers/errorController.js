const ErrorUtility = require('../util/ErrorUtilityClass');

const jwtErrorHandler = () =>
  new ErrorUtility('Invalid Token. Please log in again!', 401);

const jwtExpiryErrorHandler = () =>
  new ErrorUtility('Token has expired. Please log in again!', 401);

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
    console.log('Error', err);
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
    error = { ...err };
    if (error.name === 'JsonWebTokenError') error = jwtErrorHandler();
    if (error.name === 'TokenExpiredError') error = jwtExpiryErrorHandler();

    productionError(error, res);
  }
};

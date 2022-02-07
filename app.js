const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const authController = require('./controllers/authController');
const ErrorUtility = require('./util/ErrorUtilityClass');
const errorController = require('./controllers/errorController');
const notebookRouter = require('./routes/notebookRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(helmet());

// Rate limiter
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP. Please try again after 30 minutes',
});

app.use('/api', limiter);

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:3000',
  })
);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use('/api/v1/notebooks', authController.protect, notebookRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new ErrorUtility(`${req.originalUrl} is not available on this server`, 404)
  );
});

app.use(errorController);

module.exports = app;

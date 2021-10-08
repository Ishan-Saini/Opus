const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
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

app.use(cors());

// Body parser
app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use('/api/v1/notebooks', authController.protect, notebookRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new ErrorUtility(`${req.originalUrl} is not available on this server`, 404)
  );
});

app.use(errorController);

module.exports = app;

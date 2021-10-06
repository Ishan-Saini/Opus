const express = require('express');
const cors = require('cors');
const notebookRouter = require('./routes/notebookRoutes');
const userRouter = require('./routes/userRoutes');
const errorController = require('./controllers/errorController');
const ErrorUtility = require('./util/ErrorUtilityClass');
const authController = require('./controllers/authController');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/notebooks', authController.protect, notebookRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new ErrorUtility(`${req.originalUrl} is not available on this server`, 404)
  );
});

app.use(errorController);

module.exports = app;

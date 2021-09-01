const express = require('express');
const cors = require('cors');
const noteRouter = require('./routes/noteRoutes');
const errorController = require('./controllers/errorController');
const ErrorUtilityClass = require('./util/ErrorUtilityClass');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/notes', noteRouter);

app.all('*', (req, res, next) => {
  next(
    new ErrorUtilityClass(
      `${req.originalUrl} is not available on this server`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;

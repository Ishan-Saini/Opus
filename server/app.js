const express = require('express');
const cors = require('cors');
const noteRouter = require('./routes/noteRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/notes', noteRouter);

module.exports = app;

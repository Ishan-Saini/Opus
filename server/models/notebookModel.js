const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A notebook must belong to a user'],
  },
  title: {
    type: String,
    required: [true, 'Notebook title is required'],
  },
});

notebookSchema.pre(/^find/, function (next) {
  this.populate('user');
  next();
});

const Notebook = mongoose.model('Notebook', notebookSchema);

module.exports = Notebook;

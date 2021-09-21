const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Notebook title is required'],
  },
  notes: [
    {
      content: {
        type: Object,
        required: [true, 'Content object is required'],
      },
      title: {
        type: String,
        required: [true, "Note's title is required"],
      },
      tags: [String],
      created: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

notebookSchema.pre(/^find/, function (next) {
  this.populate('user');
  next();
});

const Notebook = mongoose.model('Notebook', notebookSchema);

module.exports = Notebook;

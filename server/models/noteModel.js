const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: Object,
    required: [true, 'Content object is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  tags: [
    {
      type: String,
    },
  ],
  created: {
    type: Date,
    default: new Date(),
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

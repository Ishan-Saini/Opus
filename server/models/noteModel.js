const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
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
});

const User = mongoose.model('Note', noteSchema);

module.exports = User;

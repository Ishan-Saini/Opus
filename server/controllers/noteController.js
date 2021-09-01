const Note = require('../models/noteModel');
const asyncUtility = require('../util/AsyncUtility');
const ErrorClass = require('../util/ErrorUtilityClass');

exports.getAllNotes = asyncUtility(async (req, res, next) => {
  const noteData = await Note.find();
  res.status(200).json({
    status: 'success',
    data: noteData,
  });
});

exports.getNote = asyncUtility(async (req, res, next) => {
  const noteData = await Note.findById(req.params.id);

  if (!noteData) {
    next(new ErrorClass('No note with that id was found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: noteData,
  });
});

exports.createNote = asyncUtility(async (req, res, next) => {
  const noteInstance = new Note({
    content: req.body.content,
    title: req.body.title,
    tags: req.body.tags,
  });

  const newNote = await noteInstance.save();
  res.status(201).json({
    status: 'success',
    newNote,
  });
});

exports.updateNote = asyncUtility(async (req, res, next) => {
  const noteData = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!noteData) {
    next(new ErrorClass('No note with that id was found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'successfully updated',
  });
});

exports.deleteNote = asyncUtility(async (req, res, next) => {
  const noteData = await Note.findByIdAndDelete(req.params.id);

  if (!noteData) {
    next(new ErrorClass('No note with that id was found', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'successfully deleted',
  });
});

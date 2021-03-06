const Note = require('../models/noteModel');
const asyncUtility = require('../util/AsyncUtility');
const ErrorUtility = require('../util/ErrorUtilityClass');

exports.getAllNotes = asyncUtility(async (req, res, next) => {
  const notesData = await Note.find({
    notebook: req.params.notebookId,
  }).select('-content -created');
  res.status(200).json({
    status: 'success',
    data: notesData,
  });
});

exports.getNote = asyncUtility(async (req, res, next) => {
  const noteData = await Note.findById(req.params.id);

  if (!noteData) {
    next(new ErrorUtility('No note with that id was found', 404));
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
    notebook: req.body.notebook,
  });

  const newNote = await noteInstance.save();
  res.status(201).json({
    status: 'success',
    data: {
      notes: newNote,
    },
  });
});

exports.deleteNote = asyncUtility(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    next(new ErrorUtility('No note with that id was found', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'successfully deleted',
  });
});

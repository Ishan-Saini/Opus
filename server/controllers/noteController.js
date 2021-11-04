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
    notebookId: req.body.notebookId,
  });

  const newNote = await noteInstance.save();
  res.status(201).json({
    status: 'success',
    notes: newNote,
  });
});

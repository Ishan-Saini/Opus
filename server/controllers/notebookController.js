const Notebook = require('../models/notebookModel');
const asyncUtility = require('../util/AsyncUtility');
const ErrorUtility = require('../util/ErrorUtilityClass');

exports.getAllNotes = asyncUtility(async (req, res, next) => {
  const noteData = await Notebook.find().populate('user');
  res.status(200).json({
    status: 'success',
    data: noteData,
  });
});

exports.getNote = asyncUtility(async (req, res, next) => {
  const noteData = await Notebook.findById(req.params.id);

  if (!noteData) {
    next(new ErrorUtility('No note with that id was found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: noteData,
  });
});

exports.createNote = asyncUtility(async (req, res, next) => {
  const noteInstance = new Notebook({
    user: req.body.user,
    title: req.body.title,
    notes: req.body.notes,
  });

  const newNote = await noteInstance.save();
  res.status(201).json({
    status: 'success',
    newNote,
  });
});

exports.updateNote = asyncUtility(async (req, res, next) => {
  const noteData = await Notebook.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!noteData) {
    next(new ErrorUtility('No note with that id was found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'successfully updated',
  });
});

exports.deleteNote = asyncUtility(async (req, res, next) => {
  const noteData = await Notebook.findByIdAndDelete(req.params.id);

  if (!noteData) {
    next(new ErrorUtility('No note with that id was found', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'successfully deleted',
  });
});

const Notebook = require('../models/notebookModel');
const asyncUtility = require('../util/AsyncUtility');
const ErrorUtility = require('../util/ErrorUtilityClass');

exports.getAllNotebooks = asyncUtility(async (req, res, next) => {
  const notebooksData = await Notebook.find({
    user: req.user._id,
  }).select('-notes');
  res.status(200).json({
    status: 'success',
    data: notebooksData,
  });
});

exports.createNotebook = asyncUtility(async (req, res, next) => {
  const notebookInstance = new Notebook({
    user: req.body.user,
    title: req.body.title,
    notes: req.body.notes,
  });

  const newNotebook = await notebookInstance.save();
  res.status(201).json({
    status: 'success',
    newNotebook,
  });
});

exports.updateNotebook = asyncUtility(async (req, res, next) => {
  const noteData = await Notebook.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!noteData) {
    next(new ErrorUtility('No notebook with that id was found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'successfully updated',
  });
});

exports.deleteNotebook = asyncUtility(async (req, res, next) => {
  const noteData = await Notebook.findByIdAndDelete(req.params.id);

  if (!noteData) {
    next(new ErrorUtility('No notebook with that id was found', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'successfully deleted',
  });
});

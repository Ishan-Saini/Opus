const Note = require('../models/noteModel');

exports.getNotes = async (req, res) => {
  try {
    const noteData = await Note.find();
    res.status(200).json({
      status: 'success',
      data: noteData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const noteData = await Note.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: noteData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createNote = async (req, res) => {
  const noteInstance = new Note({
    content: req.body.content,
    title: req.body.title,
    tags: req.body.tags,
  });

  try {
    const newNote = await noteInstance.save();
    res.status(201).json({
      status: 'success',
      newNote,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      message: 'successfully updated',
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'successfully deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

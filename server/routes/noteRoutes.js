const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(noteController.getAllNotes)
  .post(noteController.createNote);

router
  .route('/:id')
  .get(noteController.getNote)
  .delete(noteController.deleteNote);
// .patch(noteController.updateNotebook)
// .delete(noteController.deleteNotebook);

module.exports = router;

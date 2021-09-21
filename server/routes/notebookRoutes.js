const express = require('express');
const notebookController = require('../controllers/notebookController');

const router = express.Router();

router
  .route('/')
  .get(notebookController.getAllNotes)
  .post(notebookController.createNote);

router
  .route('/:id')
  .get(notebookController.getNote)
  .patch(notebookController.updateNote)
  .delete(notebookController.deleteNote);

module.exports = router;

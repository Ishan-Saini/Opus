const express = require('express');
const notebookController = require('../controllers/notebookController');
const noteRouter = require('./noteRoutes');

const router = express.Router();

router.use('/:notebookId/notes', noteRouter);

router
  .route('/')
  .get(notebookController.getAllNotebooks)
  .post(notebookController.createNotebook);

router
  .route('/:id')
  .patch(notebookController.updateNotebook)
  .delete(notebookController.deleteNotebook);

module.exports = router;

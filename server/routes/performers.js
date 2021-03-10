const express = require('express');
const imageUpload = require('../helpers/image_upload.js');

const {
  createData,
  readData,
  readOne,
  updateData,
  deleteData,
} = require('../controllers/performer_controller');

const router = express.Router();

router
  .post('/', imageUpload.single('file'), createData)
  .get('/', readData)
  .get('/:id', readOne)
  .put('/:id', imageUpload.single('file'), updateData)
  .delete('/:id', deleteData);

module.exports = router;

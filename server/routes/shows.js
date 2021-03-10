const express = require('express');

const {
  createData,
  readData,
  readOne,
  updateData,
  deleteData,
} = require('../controllers/show_controller');

const router = express.Router();

router
  .post('/', createData)
  .get('/', readData)
  .get('/:id', readOne)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = router;

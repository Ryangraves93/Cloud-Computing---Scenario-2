'use strict';

const Performer = require('../models/performer_schema');
var fs = require('fs');
const appRoot = require('app-root-path');

const createData = (req, res) => {
  
  let performerData = req.body;
  if (req.file) {
    performerData.image_path = req.file.filename
  }
  
  Performer.create(performerData)
    .then((data) => {
      console.log('New Performer Created!', data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const readData = (req, res) => {
  Performer.find()
    .then((data) => {
      if(data){
        let img = `${process.env.STATIC_FILES_URL}${data.image_path}`;
        data.image_path = img;
        res.status(200).json(data);
      }
      else {
        res.status(404).json("None found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  Performer.findById(req.params.id)
    .then((data) => {
      let img = `${process.env.STATIC_FILES_URL}${data.image_path}`;
      data.image_path = img;
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateData = (req, res) => {
  
  let performerData = req.body;
  if (req.file) {
    performerData.image_path = req.file.filename
  }
  
  Performer.findByIdAndUpdate(req.params.id, performerData, {
    useFindAndModify: false,
    new: false,
  })
    .then((data) => {
      console.log('Performer updated!');
      ////// delete the old image file/////
      fs.unlink(`${appRoot}/views/uploads/${data.image_path}`, (err) => {
        if (err) throw err;
        console.log(`${data.image_path} was deleted`);
      });
      ////////////////////////////
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let image_path = '';
  Performer.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('Performer not available');
      }
      image_path = data.image_path;
      return data.remove();
    })
    .then((data) => {
      console.log('Performer removed!');
      ////// delete the image file/////
      fs.unlink(`${appRoot}/views/uploads/${data.image_path}`, (err) => {
        if (err) throw err;
        console.log(`${data.image_path} was deleted`);
      });
      ////////////////////////////
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createData,
  readData,
  readOne,
  updateData,
  deleteData,
};

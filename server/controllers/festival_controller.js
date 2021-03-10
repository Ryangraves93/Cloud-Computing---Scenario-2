'use strict';

const Festival = require('../models/festival_schema');
var fs = require('fs');
const appRoot = require('app-root-path');

const createData = (req, res) => {
  
  let festivalData = req.body;
  // let extname = path.extname(req.file.filename)
  // let filename = 
  if (req.file) {
    festivalData.image_path = req.file.filename
  }
  
  // console.log("////////");
  // console.log(req.file.filename);
  // console.log(festivalData.image_path);
  // console.log(festivalData);
  // console.log("////////");
  
  Festival.create(festivalData)
    .then((data) => {
      console.log('New Festival Created!', data);
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
  Festival.find()
    .then((data) => {
      console.log(data);
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
  Festival.findById(req.params.id)
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
  
  let festivalData = req.body;
  if (req.file) {
    festivalData.image_path = req.file.filename
  }
  console.log("festivalData: ", festivalData);
  
  Festival.findByIdAndUpdate(req.params.id, festivalData, {
    useFindAndModify: false,
    new: false,
  })
    .then((data) => {
      console.log('Festival updated!');
      
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
  Festival.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('Festival not available');
      }
      image_path = data.image_path;
      return data.remove();
    })
    .then((data) => {
      console.log('Festival removed!');
      
      ////// delete the image file/////
      fs.unlink(`${appRoot}/views/uploads/${image_path}`, (err) => {
        if (err) throw err;
        console.log(`${image_path} was deleted`);
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

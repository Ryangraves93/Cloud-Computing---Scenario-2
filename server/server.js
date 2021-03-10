// Importing required modules
const cors = require('cors');
const express = require('express');

// parse env variables
require('dotenv').config();

require("./helpers/db/mongodb.js")();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());

app.set('view engine', 'html');

// Static folder
// console.log(__dirname + '/views/');
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api/festivals', require('./routes/festivals'));
app.use('/api/stages', require('./routes/stages'));
app.use('/api/shows', require('./routes/shows'));
app.use('/api/performers', require('./routes/performers'));

// returns image by filename
// get images: http://localhost/uploads/

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}`);

module.exports = app;

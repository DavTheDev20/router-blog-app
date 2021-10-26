const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);

mongoose.connect('mongodb://127.0.0.1:27017/router-blog-app-DB', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to database');
  }
});

app.listen(port, () => console.log(`Server running on port: ${port}`));

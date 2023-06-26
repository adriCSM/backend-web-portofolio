const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
  cors({
    origin: ['https://adri-csm.my.id', 'http://localhost:8080'],
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connection mongoDB successfully');
  })
  .catch((err) => {
    console.log('Error: ', err.message);
  });
app.use('/', require('./router/router'));

app.listen(process.env.PORT, () => {
  console.log('localhos ranning at http://localhost:', process.env.PORT, '');
});

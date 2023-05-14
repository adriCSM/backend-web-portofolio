const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: ['http:api.adri-csm.my.id', 'http://localhost:8080'],
    }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
    .connect(process.env.uri)
    .then(() => {
        console.log('connection mongoDB successfully');
    })
    .catch(() => {
        console.log('connection mongoDB unsuccessfully');
    });

app.use('/', require('./router/router'));

app.listen(process.env.PORT, () => {
    console.log('localhos ranning at http://localhost:' + process.env.PORT + '');
});
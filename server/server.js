const express = require('express');
const bodyParser = require('body-parser');

const { api: config } = require('../config');
const { categoryRouter, deviceRouter } = require('./routes');

const app = express();

console.log('Initializing API');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/category', categoryRouter);
app.use('/device', deviceRouter);

// TODO: Set default handler for other reqs

app.listen(config.port);
console.log(`API ready for requests on port ${config.port}`);

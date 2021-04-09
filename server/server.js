const express = require('express');
const { ValidationError } = require('express-validation');
const bodyParser = require('body-parser');

const { api: config } = require('../config');
const { categoryRouter, deviceRouter } = require('./routes');

const app = express();

console.log('Initializing API');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/category', categoryRouter);
app.use('/device', deviceRouter);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
});

app.listen(config.port);
console.log(`API ready for requests on port ${config.port}`);

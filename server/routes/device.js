const express = require('express');

const { deviceController } = require('../controller');

const deviceRouter = express.Router();

deviceRouter.route('/')
  .get(deviceController.getAll)
  .post(deviceController.post);

deviceRouter.route('/:id')
  .get(deviceController.get)
  .delete(deviceController.delete);

module.exports = deviceRouter;

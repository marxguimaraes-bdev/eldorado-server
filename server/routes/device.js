const express = require('express');
const { validate } = require('express-validation');

const { deviceController, optionsController } = require('../controller');
const { deviceSchema, idSchema } = require('../validation');

const deviceRouter = express.Router();

deviceRouter.route('/')
  .options(optionsController.handler)
  .get(deviceController.getAll)
  .post(validate(deviceSchema), deviceController.post);

deviceRouter.route('/:id')
  .options(optionsController.handler)
  .delete(validate(idSchema), deviceController.delete);

module.exports = deviceRouter;

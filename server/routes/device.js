const express = require('express');
const { validate } = require('express-validation');

const { deviceController } = require('../controller');
const { deviceSchema, idSchema } = require('../validation');

const deviceRouter = express.Router();

deviceRouter.route('/')
  .get(deviceController.getAll)
  .post(validate(deviceSchema), deviceController.post);

deviceRouter.route('/:id')
  .get(validate(idSchema), deviceController.get)
  .delete(validate(idSchema), deviceController.delete);

module.exports = deviceRouter;

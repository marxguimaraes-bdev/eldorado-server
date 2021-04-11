const express = require('express');
const { validate } = require('express-validation');

const { categoryController, optionsController } = require('../controller');
const { categorySchema, idSchema } = require('../validation');

const categoryRouter = express.Router();

categoryRouter.route('/')
  .options(optionsController.handler)
  .get(categoryController.getAll)
  .post(validate(categorySchema), categoryController.post);

categoryRouter.route('/:id')
  .options(optionsController.handler)
  .delete(validate(idSchema), categoryController.delete);

module.exports = categoryRouter;

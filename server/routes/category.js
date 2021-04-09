const express = require('express');
const { validate } = require('express-validation');

const { categoryController } = require('../controller');
const { categorySchema, idSchema } = require('../validation');

const categoryRouter = express.Router();

categoryRouter.route('/')
  .get(categoryController.getAll)
  .post(validate(categorySchema), categoryController.post);

categoryRouter.route('/:id')
  .get(validate(idSchema), categoryController.get)
  .delete(validate(idSchema), categoryController.delete);

module.exports = categoryRouter;

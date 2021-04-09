const express = require('express');

const { categoryController } = require('../controller');

const categoryRouter = express.Router();

categoryRouter.route('/')
  .get(categoryController.getAll)
  .post(categoryController.post);

categoryRouter.route('/:id')
  .get(categoryController.get)
  .delete(categoryController.delete);

module.exports = categoryRouter;

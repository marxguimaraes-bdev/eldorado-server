const Joi = require('joi');

const categorySchema = {
  body: Joi.object({
    name: Joi.string(),
  }),
};

module.exports = categorySchema;

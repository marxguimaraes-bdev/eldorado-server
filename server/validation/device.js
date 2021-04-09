const Joi = require('joi');

const deviceSchema = {
  body: Joi.object({
    color: Joi.string().regex(/\w+/),
    categoryId: Joi.number().integer(),
    partNumber: Joi.number().integer().positive(),
  }),
};

module.exports = deviceSchema;

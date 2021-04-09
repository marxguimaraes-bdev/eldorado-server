const Joi = require('joi');

const idSchema = {
  params: Joi.object({
    id: Joi.number().integer().min(1),
  }),
};

module.exports = idSchema;

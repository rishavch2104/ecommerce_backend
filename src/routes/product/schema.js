const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  title: Joi.string().required().min(3).max(50),
  shortDescription: Joi.string().required().min(10).max(100),
  description: Joi.string().required().min(40).max(5000),
  price: Joi.number().required(),
  discount: Joi.number().required(),
});

module.exports = schema;

const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
  name: Joi.string().required().min(5).max(45),
});

module.exports = schema;

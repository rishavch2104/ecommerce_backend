const Joi = require("@hapi/joi");

module.exports = {
  auth: Joi.object().keys({
    authorization: Joi.string()
      .custom((value, helpers) => {
        if (!value.startsWith("Bearer")) return helpers.error("any.invalid");
        if (!value.split("")[1]) return helpers.error("invalid");
        return value;
      }, "Auth Header Validation")
      .required(),
  }),
};

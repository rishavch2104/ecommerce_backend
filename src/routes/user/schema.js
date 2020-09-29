const Joi = require("@hapi/joi");

module.exports = {
  userCredentials: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  signUp: Joi.object().keys({
    firstName: Joi.string().required().min(3).max(15),
    lastName: Joi.string().required().min(3).max(15),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  addresses: Joi.object().keys({
    buildingName: Joi.string().required().max(20),
    streetAddress1: Joi.string().required().max(50),
    locality: Joi.string().required().max(100),
    city: Joi.string().required().min(3),
    pinCode: Joi.number().required(),
    state: Joi.string().required().min(4),
    phoneNumber: Joi.number().required(),
  }),
};

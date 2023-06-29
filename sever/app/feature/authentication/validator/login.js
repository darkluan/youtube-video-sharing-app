const Joi = require("joi");

module.exports = Joi.object().keys({
  grant_type: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
});

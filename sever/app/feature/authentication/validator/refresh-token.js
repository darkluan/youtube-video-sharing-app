const Joi = require('joi');

module.exports = Joi.object().keys({
  grant_type: Joi.string().required(),
  refresh_token: Joi.string().required(),
});

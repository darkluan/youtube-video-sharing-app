const Joi = require("joi");
const schema = Joi.object().keys({
  youtubeUrl: Joi.string().required(),
});

module.exports = schema;

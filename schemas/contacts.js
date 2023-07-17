const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.email": "Invalid email format",
  }),
  phone: Joi.string()
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be in the format (111) 111-1111",
      "any.required": "Missing required phone field",
    }),
  });

  module.exports = {
    addSchema,
  }
const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Email must be a valid format',
      'string.empty': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{6,}$'))
    .messages({
      'string.pattern.base': 'Password must have at least 1 letter and 1 number',
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required',
    }),
});

module.exports = registerSchema;

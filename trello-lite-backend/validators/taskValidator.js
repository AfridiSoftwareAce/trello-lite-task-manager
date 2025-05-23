const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  status: Joi.string().valid("To Do", "In Progress", "Completed"),
  dueDate: Joi.date().optional(),
});

module.exports = { taskSchema };

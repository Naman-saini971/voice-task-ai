const { body, validationResult } = require("express-validator");

const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be text"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium or high"),

  body("dueDate")
    .optional({ values: "falsy", nullable: true })
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be true or false"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  createTaskValidation,
  validate,
};

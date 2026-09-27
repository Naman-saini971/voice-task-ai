const express = require("express");

const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  createTaskValidation,
  validate,
} = require("../validations/taskValidation");

// All task routes are protected
router.use(protect);

// GET all tasks
router.get("/", getTasks);

// CREATE task
router.post(
  "/",
  createTaskValidation,
  validate,
  createTask
);

// UPDATE task
router.put(
  "/:id",
  createTaskValidation,
  validate,
  updateTask
);

// DELETE task
router.delete(
  "/:id",
  deleteTask
);

module.exports = router;
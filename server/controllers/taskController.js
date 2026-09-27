const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description || "",
      dueDate: req.body.dueDate,
      priority: req.body.priority,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const allowedStatuses = ["active", "completed", "cancelled", "delayed"];

    if (
      req.body.status !== undefined &&
      !allowedStatuses.includes(req.body.status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status must be active, completed, cancelled, or delayed",
      });
    }

    const { delayedUntil } = req.body;
    if (
      delayedUntil !== undefined &&
      delayedUntil !== null &&
      (typeof delayedUntil !== "string" || Number.isNaN(Date.parse(delayedUntil)))
    ) {
      return res.status(400).json({
        success: false,
        message: "delayedUntil must be a valid date",
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.title = req.body.title;
    task.description = req.body.description || "";
    task.priority = req.body.priority;
    task.dueDate = req.body.dueDate;
    task.completed = req.body.completed;
    
    if (req.body.status !== undefined) {
      task.status = req.body.status;
    }

    if (req.body.delayedUntil !== undefined) {
      task.delayedUntil = req.body.delayedUntil;
    }
    await task.save();

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

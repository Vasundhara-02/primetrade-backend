const { validationResult } = require('express-validator');
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      userId: req.user.id,
    });
    res.status(201).json({ message: 'Task created.', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const where = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const tasks = await Task.findAll({ where });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    await task.update(req.body);
    res.status(200).json({ message: 'Task updated.', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    if (req.user.role !== 'admin' && task.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

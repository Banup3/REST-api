const Task = require('../models/Task');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // Build query
    const query = {};
    
    // Users can only see their own tasks, admins can see all
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const tasks = await Task.find(query)
      .populate('user', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: {
        tasks
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single task
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name email');

    if (!task) {
      return next(new AppError('Task not found', 404));
    }

    // Check ownership (users can only access their own tasks)
    if (req.user.role !== 'admin' && task.user._id.toString() !== req.user.id) {
      return next(new AppError('Not authorized to access this task', 403));
    }

    res.status(200).json({
      success: true,
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
const createTask = async (req, res, next) => {
  try {
    // Add user to task
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    logger.info(`Task created: ${task._id} by user: ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(new AppError('Task not found', 404));
    }

    // Check ownership (users can only update their own tasks)
    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return next(new AppError('Not authorized to update this task', 403));
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    logger.info(`Task updated: ${task._id} by user: ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new AppError('Task not found', 404));
    }

    // Check ownership (users can only delete their own tasks)
    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return next(new AppError('Not authorized to delete this task', 403));
    }

    await task.deleteOne();

    logger.info(`Task deleted: ${req.params.id} by user: ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get task statistics
 * @route   GET /api/v1/tasks/stats
 * @access  Private
 */
const getTaskStats = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user.id };

    const stats = await Task.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        statusStats: stats,
        priorityStats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};

const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, category, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required.' });
        }

        const newTask = new Task({
            title,
            description,
            category: category || 'Others',  // Default to "Others" if category not provided
            dueDate: dueDate || null,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task.' });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, category, dueDate } = req.body;

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.category = category || task.category;
        task.dueDate = dueDate || task.dueDate;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task.' });
    }
};

// Mark task as complete
exports.markTaskAsComplete = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.completed) return res.status(400).json({ message: 'Task already completed' });

        task.completed = true;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error completing task' });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};

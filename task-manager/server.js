require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Critical for the HTML file to connect
app.use(express.static(__dirname));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb')
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Internal Imports
const auth = require('./middleware/auth');
const User = require('./models/User');
const Task = require('./models/Task');

// --- API Routes ---

// Auth
app.use('/api/auth', require('./routes/auth'));

// Fetch all tasks for the logged-in user
app.get('/api/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Create a new task
app.post('/api/tasks', auth, async (req, res) => {
    try {
        const newTask = new Task({ 
            title: req.body.title, 
            userId: req.user.userId 
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: "Error creating task" });
    }
});

// Toggle Task Status (Completed/Pending)
app.patch('/api/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { completed: req.body.completed },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
});

// Delete Task
app.delete('/api/tasks/:id', auth, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(400).json({ message: "Delete failed" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

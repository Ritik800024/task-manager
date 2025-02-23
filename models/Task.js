const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date }, 
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Home', 'Others'],  
        default: 'Others'
    }, 
});

module.exports = mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    description: { type: String, required: true },
    level: { type: String, required: true },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

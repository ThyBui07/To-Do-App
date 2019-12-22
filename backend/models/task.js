const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    content: { type: String, require: true }
  });

module.exports = mongoose.model('Task', taskSchema );
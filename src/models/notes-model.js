const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  message: String,
});

module.exports = mongoose.model('Note', noteSchema);

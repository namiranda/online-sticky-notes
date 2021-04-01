const mongoose = require('mongoose');
const noteSchema = require('./notes-model').schema;

const workspaceSchema = new mongoose.Schema({
  name: String,
  notes: [noteSchema],
});

module.exports = mongoose.model('Workspace', workspaceSchema);

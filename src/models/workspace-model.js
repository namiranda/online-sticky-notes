const mongoose = require('mongoose');
const noteSchema = require('./notes-model').schema;

const workspaceSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

module.exports = mongoose.model('Workspace', workspaceSchema);

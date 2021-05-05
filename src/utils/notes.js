const Note = require('../models/notes-model');
const Workspace = require('../models/workspace-model');

const createNote = async (workspace_id, content) => {
  const newNote = new Note({ content: content });
  Workspace.findById(workspace_id, (err, foundWorkspace) => {
    if (err) {
      console.log(err); //TODO: cambiar esto por un throw error
    }
    newNote.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        foundWorkspace.notes.push(newNote);
        foundWorkspace.save();
        console.log('note created');
      }
    });
  });
  return newNote;
};

const getNotes = async (workspace_id) => {
  let notes = await Workspace.findById(workspace_id)
    .populate('notes')
    .then((foundWorkspace) => {
      return foundWorkspace.notes;
    })
    .catch((err) => {
      console.log(err);
    });
  return notes;
};

module.exports = { createNote, getNotes };

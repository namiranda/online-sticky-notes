const Note = require('../models/notes-model');
const Workspace = require('../models/workspace-model');

const createNote = (workspace_id, content) => {
  Workspace.findById(workspace_id, (err, foundWorkspace) => {
    if (err) {
      console.log(err); //TODO: cambiar esto por un throw error
    }
    Note.create(
      {
        content: content,
      },
      (err, newNote) => {
        if (err) {
          console.log(err);
        } else {
          newNote.save();
          foundWorkspace.notes.push(newNote);
          foundWorkspace.save();
          console.log('note created');
        }
      }
    );
  });
};

const getNotes = async (workspace_id) => {
  let notes = await Workspace.findById(workspace_id)
    .populate('notes')
    .then((foundWorkspace) => {
      return foundWorkspace;
    })
    .catch((err) => {
      console.log(err);
    });
  return notes;
};

module.exports = { createNote, getNotes };

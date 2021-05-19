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
        foundWorkspace.modified = Date.now();
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

const deleteNote = (workspace_id, note_id) => {
  Note.findByIdAndRemove(note_id, (err) => {
    if (err) {
      console.log(err);
    } else {
      Workspace.findById(workspace_id).exec(function (err, foundWorkspace) {
        if (err) {
          console.log(err);
        } else {
          //removes the note id from the array in workspace
          foundWorkspace.notes.pull({ _id: note_id });
          foundWorkspace.save();
          console.log('note removed successfully');
        }
      });
    }
  });
};

module.exports = { createNote, getNotes, deleteNote };

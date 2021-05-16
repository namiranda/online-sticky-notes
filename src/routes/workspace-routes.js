const router = require('express').Router();
const User = require('../models/user-model');
const Workspace = require('../models/workspace-model');
const Note = require('../models/notes-model');

router.get('/api/workspaces/:user_id', (req, res) => {
  User.findById(req.params.user_id)
    .populate('workspaces')
    .exec(function (err, foundUser) {
      if (err) {
        console.log(err);
      }
      res.status(200).send(foundUser.workspaces);
    });
});

router.post('/api/workspaces/:user_id', (req, res) => {
  User.findById(req.params.user_id, (err, foundUser) => {
    if (err) {
      console.log(err); //TODO: cambiar esto por un throw error
    }
    Workspace.create(
      {
        name: req.body.name,
        owner: foundUser._id,
        date: Date.now(),
        modified: Date.now(),
      },
      (err, newWorkspace) => {
        if (err) {
          console.log(err);
        } else {
          newWorkspace.save();
          foundUser.workspaces.push(newWorkspace);
          foundUser.save();
        }
      }
    );

    res.status(201).send('Workspace successfully created');
  });
});

router.delete('/api/workspaces/:user_id/:workspace_id', (req, res) => {
  Workspace.findById(req.params.workspace_id, (err, workspace) => {
    if (err) {
      console.log(err);
    } else {
      //Verify that the user who want to delete de ws is the one who created
      if (workspace.owner.equals(req.params.user_id)) {
        //Deletes de notes in the workspace
        Note.deleteMany()
          .where('_id')
          .in(workspace.notes)
          .exec((err) => {
            if (err) {
              console.log(err);
            }
          });
        Workspace.deleteOne({ _id: workspace._id }, (err) => {
          if (err) {
            console.log(err);
          }
          User.findById(req.params.user_id).exec(function (err, user) {
            if (err) {
              console.log(err);
            } else {
              user.workspaces.pull({ _id: req.params.workspace_id });
              user.save();
            }
          });
          res.status(200).send('The workspace was deleted successfully');
        });
      } else {
        res.status(400).send('You are not allowed to perform this accion');
      }
    }
  });
});

module.exports = router;

const router = require('express').Router();
const User = require('../models/user-model');
const Workspace = require('../models/workspace-model');

router.get('/api/workspaces/:user_id', (req, res) => {
  User.findById(req.params.user_id)
    .populate('workspaces')
    .exec(function (err, foundUser) {
      if (err) {
        console.log(err);
      }
      console.log(foundUser.workspaces);
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
      if (workspace.owner.equals(req.params.user_id)) {
        //Verify that the user who want to delete de ws is the one who created
        Workspace.deleteOne({ _id: workspace._id }, (err) => {
          if (err) {
            console.log(err);
          }
          res.status(200).send('The workspace was deleted successfully');
        });
      } else {
        res.status(400).send('You are not allowed to perform this accion');
      }
    }
  });
});

module.exports = router;
//GIT: agrego owner ref y delete ws

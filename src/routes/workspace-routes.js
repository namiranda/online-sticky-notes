const router = require('express').Router();
const User = require('../models/user-model');
const Workspace = require('../models/workspace-model');

router.get('/api/workspaces/:user_id', (req, res) => {
  User.findById(req.params.user_id)
    .populate('workspaces')
    .exec(function (err, foundUser) {
      if (err) return handleError(err);
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

module.exports = router;

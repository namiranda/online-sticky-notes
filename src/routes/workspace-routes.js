const router = require('express').Router();
const { body } = require('express-validator');
const User = require('../models/user-model');
const Workspace = require('../models/workspace-model');

router.get('/api/workspaces/:user_id', (req, res) => {
  User.findById(req.params.user_id, (err, foundUser) => {
    if (err) {
      console.log(err); //TODO: cambiar esto por un throw error
    }
    const workspaces = foundUser.workspaces;
    console.log(workspaces);
    res.status(201).send(workspaces);
  });
});

router.post('/api/workspaces/:user_id', (req, res) => {
  User.findById(req.params.user_id, (err, foundUser) => {
    if (err) {
      console.log(err); //TODO: cambiar esto por un throw error
    }
    foundUser.workspaces.push({ name: req.body.name });

    console.log(foundUser.workspaces);
    res.status(201).send('Workspace successfully created');
  });
});

module.exports = router;

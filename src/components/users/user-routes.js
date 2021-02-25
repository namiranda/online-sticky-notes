const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const User = require('./user-model');

router.post(
  '/users/signup',
  [
    body('username')
      .isLength({ min: 4, max: 10 })
      .withMessage('Username must be between 4 an 10 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req, res) => {
    const errors = validationResult(req); //Extrae los errores

    if (!errors.isEmpty()) {
      //Comprueba si existen errores
      return res.status(400).send(errors.array()); //Return early y envia los errores
    }

    const { username, email, password } = req.body;
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    User.create(newUser, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(user);
      }
    });
    console.log('Creating a user...');
  }
);

module.exports = router;

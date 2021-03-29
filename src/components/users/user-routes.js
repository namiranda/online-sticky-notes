const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Password = require('./utils/password');
const currentUser = require('../common/current-user');
const { BadRequest } = require('../../utils/errors');
const validateRequest = require('../../middlewares/validate-request');

const User = require('./user-model');

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req, res, next) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }); //Si existe un user con el mismo email, se lo asigna a existing user
    //En caso contrario existing user va a ser null
    try {
      if (existingUser) {
        throw new BadRequest('Email in use');
      }
      const user = new User({ email: email, password: password });

      user.save();

      //Generate JWT
      const userJwt = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '2h',
        }
      );

      //Store it on session object
      req.session.jwt = userJwt;

      res.status(201).send(user);
      // res.json(post);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req, res, next) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    try {
      if (!existingUser) {
        throw new BadRequest('Invalid credentials');
      }

      const passwordMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (!passwordMatch) {
        throw new BadRequest('Invalid credentials');
      }
      //Generate JWT
      const userJwt = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
        },
        process.env.JWT_KEY
      );

      //Store it on session object
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send(existingUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send({});
});

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

module.exports = router;

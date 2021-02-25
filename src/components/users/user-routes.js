const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('./user-model');

router.post(
  '/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req); //Extrae los errores

    if (!errors.isEmpty()) {
      //Comprueba si existen errores
      return res.status(400).send(errors.array()); //Return early y envia los errores
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }); //Si existe un user con el mismo email, se lo asigna a existing user
    //En caso contrario existing user va a ser null

    if (existingUser) {
      return res.send('Email in use');
    }

    const user = new User({ email: email, password: password });

    user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '2h',
      }
    );

    //Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

module.exports = router;

const validationResult = require('express-validator').validationResult;
const { RequestValidationError } = require('../utils/errors');
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  } catch (err) {
    next(err);
  }
  next();
};

module.exports = validateRequest;

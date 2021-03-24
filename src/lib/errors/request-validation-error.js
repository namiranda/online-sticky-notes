const CustomError = require('./custom-error');

class RequestValidationError extends CustomError {
  statusCode = 400;
  errors;
  constructor(errors) {
    super('Invalid request parameters');
    errors = this.errors;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}

module.exports = RequestValidationError;

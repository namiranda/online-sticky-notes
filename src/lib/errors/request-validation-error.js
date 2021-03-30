const CustomError = require('./custom-error');

class RequestValidationError extends CustomError {
  statusCode = 400;
  errors;
  constructor(errors) {
    this.errors = errors;
    super('Invalid request parameters');
  }

  serializeErrors() {
    console.log(errors);
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}

module.exports = RequestValidationError;

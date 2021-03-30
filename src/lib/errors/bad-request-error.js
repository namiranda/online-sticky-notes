const CustomError = require('./custom-error');

class BadRequestError extends CustomError {
  statusCode = 400;
  message;

  constructor(message) {
    super(message);
    this.message = message;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = BadRequestError;

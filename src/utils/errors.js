class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest || this instanceof RequestValidationError) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class RequestValidationError extends GeneralError {
  statusCode = 400;
  errors;
  constructor(errors) {
    super('Invalid request parameters');
    this.errors = errors;
    this.serializeErrors();
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}

module.exports = {
  GeneralError,
  BadRequest,
  RequestValidationError,
  NotFound,
};

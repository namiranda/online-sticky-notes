class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

class BadRequest extends GeneralError {
  statusCode = 400;

  constructor(message) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

class NotFound extends GeneralError {}
class RequestValidationError extends GeneralError {
  statusCode = 400;
  errors;
  constructor(errors) {
    super('Invalid request parameters');
    this.errors = errors;
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

class CustomError extends Error {
  statusCode;
  message;

  constructor(message) {
    super(message);
    message = this.message;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = CustomError;

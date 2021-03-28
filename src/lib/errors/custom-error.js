class CustomError extends Error {
  statusCode;
  message;

  constructor(message) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = CustomError;

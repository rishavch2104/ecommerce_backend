class APIError extends Error {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends APIError {
  constructor(message = "Resource", statusCode = "404") {
    super("${message} not found", statusCode);
  }
}

class AlreadyExistsError extends APIError {
  constructor(message = "Resource", statusCode = "401") {
    super("${message} already exists", statusCode);
  }
}
class IncorrectPasswordError extends APIError {
  constructor(message = "Incorrect Password", statusCode = "401") {
    super(message, statusCode);
  }
}

class InvalidTokenError extends APIError {
  constructor(message = "Invalid Token", statusCode = "402") {
    super(message, statusCode);
  }
}

module.exports = { NotFoundError, AlreadyExistsError, NotFoundError };

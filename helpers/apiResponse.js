class APIResponse {
  constructor(message, data, statusCode, status) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.status = status;
  }

  send(res) {
    return res.status(this.statusCode).json(this.format());
  }
  format() {
    if (this.data) {
      return {
        status: this.status,
        message: this.message,
        data: this.data,
      };
    } else {
      return {
        status: this.status,
        message: this.message,
      };
    }
  }
}

class SuccessResponse extends APIResponse {
  constructor(message, data, statusCode = 200, status = "OK") {
    super(message, data, statusCode, status);
  }
}

class SuccessMessageResponse extends APIResponse {
  constructor(message, data = null, statusCode = 204, status = "OK") {
    super(message, data, statusCode, statusCode);
  }
}

module.exports = { SuccessMessageResponse, SuccessResponse };

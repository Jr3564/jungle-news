const statusCode = require("./statusCodes");

class BadRequest {
  constructor(message) {
    this.message = message || "Bad Request";
    this.statusCode = statusCode.BAD_REQUEST;
  }
}

class UnprocessableEntity {
  constructor(message) {
    this.message = message || "Unprocessable Entity";
    this.statusCode = statusCode.UNPROCESSABLE_ENTITY;
  }
}

class NotFound {
  constructor(message) {
    this.message = message || "Not Found";
    this.statusCode = statusCode.NOT_FOUND;
  }
}

class Unauthorized {
  constructor(message) {
    this.message = message || "Unauthorized";
    this.statusCode = statusCode.UNAUTHORIZED;
  }
}

class InternalServerError {
  constructor(message) {
    this.message = message || "Internal Server Error";
    this.statusCode = statusCode.INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
  BadRequest,
  NotFound,
  Unauthorized,
  UnprocessableEntity,
  InternalServerError,
};

const service = require("../service");

module.exports = (error, _req, response, _next) => {
  try {
    response.status(error.statusCode).json({ message: error.message });
  } catch (_err) {
    const { InternalServerError } = service.ErrorInstance;

    const Error = new InternalServerError("Internal Server Error");

    response.status(Error.statusCode).json({ message: Error.message });
  }
};

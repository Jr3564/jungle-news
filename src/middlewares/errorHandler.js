const { ErrorInstance } = require("../service");

module.exports = (error, _req, response, _next) => {
  try {
    response.status(error.statusCode).json({ message: error.message });
  } catch (_err) {
    let Error = new ErrorInstance.InternalServerError("Internal Server Error");

    if (error.toString().includes("UniqueViolationError")) {
      Error = new ErrorInstance.UnprocessableEntity(
        "Duplicates are not allowed"
      );
    }

    response.status(Error.statusCode).json({ message: Error.message });
  }
};

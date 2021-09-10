const service = require("../service");

module.exports = class {
  static async getAll(_request, response) {
    const Service = new service.Authors();
    const authors = await Service.getAll();
    response.status(service.statusCodes.OK).json(authors);
  }
};

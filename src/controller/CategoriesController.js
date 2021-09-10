const service = require("../service");

module.exports = class {
  static async getAll(_request, response) {
    const Service = new service.Categories();
    const categories = await Service.getAll();
    response.status(service.statusCodes.OK).json(categories);
  }
};

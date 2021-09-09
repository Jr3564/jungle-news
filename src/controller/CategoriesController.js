const service = require("../service");

module.exports = class {
  static async getAll(_request, response) {
    try {
      const Service = new service.Categories();
      const categories = await Service.getAll();
      response.status(200).json(categories);
    } catch (err) {
      console.log(err);
    }
  }
};

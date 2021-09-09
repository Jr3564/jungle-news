const service = require("../service");

module.exports = class {
  static async getAll(_request, response) {
    try {
      const Service = new service.Authors();
      const authors = await Service.getAll();
      response.status(200).json(authors);
    } catch (err) {
      console.log(err);
    }
  }
};

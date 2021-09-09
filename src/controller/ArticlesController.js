const service = require("../service");

module.exports = class {
  static async getAll(request, response) {
    const { accessLevelId } = request.user;

    const Service = new service.Articles(accessLevelId);

    try {
      const articles = await Service.getAll(request.query);

      response.status(200).json(articles);
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }
  static async getById(request, response) {
    const { accessLevelId } = request.user;

    const Service = new service.Articles(accessLevelId);

    try {
      const article = await Service.getById(request.params.id);
      response.status(200).json(article);
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }
};

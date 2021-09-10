const service = require("../service");

module.exports = class {
  static async getAll(request, response) {
    const { accessLevelId } = request.user;

    const Service = new service.Articles(accessLevelId);

    const articles = await Service.getAll(request.query);

    response.status(service.statusCodes.OK).json(articles);
  }
  static async getById(request, response) {
    const { accessLevelId } = request.user;

    const Service = new service.Articles(accessLevelId);

    const article = await Service.getById(request.params.id);
    response.status(service.statusCodes.OK).json(article);
  }
};

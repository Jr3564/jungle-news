const service = require("../../service");

module.exports = class {
  static async create(request, response) {
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Categories(accessLevelId);

    const result = await Service.create(request.body);

    response.status(service.statusCodes.CREATED).json(result);
  }

  static async getAll(request, response) {
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Categories(accessLevelId);

    const result = await Service.getAll(request.body);

    response.status(service.statusCodes.OK).json(result);
  }

  static async update(request, response) {
    const { id } = request.params;
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Categories(accessLevelId);

    const result = await Service.updateById(id, request.body);

    response.status(service.statusCodes.OK).json(result);
  }

  static async delete(request, response) {
    const { id } = request.params;
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Categories(accessLevelId);

    const result = await Service.deleteById(id);

    response.status(service.statusCodes.OK).json(result);
  }
};

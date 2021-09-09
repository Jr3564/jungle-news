const service = require("../../service");

module.exports = class {
  static async create(request, response) {
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Articles(accessLevelId);

    try {
      const result = await Service.create(request.body);

      response.status(201).json(result);
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }

  static async getAll(request, response) {
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Articles(accessLevelId);

    try {
      const result = await Service.getAll(request.body);

      response.status(200).json(result);
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }

  static async update(request, response) {
    const { id } = request.params;
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Articles(accessLevelId);

    try {
      const result = await Service.updateById(id, request.body);

      response.status(200).json(result);
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }

  static async delete(request, response) {
    const { id } = request.params;
    const accessLevelId = request.user && request.user.accessLevelId;

    const Service = new service.Articles(accessLevelId);

    try {
      const result = await Service.deleteById(id);

      response.status(200).json(result);
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }
};

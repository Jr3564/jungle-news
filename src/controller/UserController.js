const service = require("../service");

module.exports = class {
  static async create(request, response) {
    const Service = new service.Users();
    const user = await Service.create(request.body);

    response.status(service.statusCodes.CREATED).json(user);
  }

  static async singIn(request, response) {
    const Service = new service.Users();
    const token = await Service.signIn(request.body);

    response.status(service.statusCodes.OK).json({ token });
  }
};

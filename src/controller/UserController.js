const service = require("../service");

module.exports = class {
  static async create(request, response) {
    try {
      const Service = new service.Users();
      const user = await Service.create(request.body);

      response.status(200).json(user);
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }

  static async singIn(request, response) {
    try {
      const Service = new service.Users();
      const token = await Service.signIn(request.body);

      response.status(200).json({ token });
    } catch ({ message }) {
      response.status(666).json({ message });
    }
  }
};

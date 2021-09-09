const service = require("../service");

module.exports = class {
  static async verifyAccessLevel(request, _response, next) {
    try {
      const authorization = request.headers.authorization;
      const [, token] = authorization.split(" ");

      const { accessLevelId, userId } =
        service.Authentication.tokenVerify(token).tokenDecode(token);

      request.user = { userId, accessLevelId };

      return next();
    } catch (_err) {
      request.user = { accessLevelId: null };

      return next();
    }
  }

  static async ensureAuthentication(request, response, next) {
    try {
      const authorization = request.headers.authorization;

      if (!authorization) throw new Error("Unauthorized!");
      const [, token] = authorization.split(" ");

      const { accessLevelId, userId } =
        service.Authentication.tokenVerify(token).tokenDecode(token);

      request.user = { userId, accessLevelId };

      return next();
    } catch ({ message }) {
      return response.status(401).json({ message });
    }
  }

  static async ensureAdminLevel(request, response, next) {
    try {
      const authorization = request.headers.authorization;

      if (!authorization) throw new Error("Unauthorized!");
      const [, token] = authorization.split(" ");

      const { accessLevelId, userId } =
        service.Authentication.tokenVerify(token).tokenDecode(token);

      if (accessLevelId !== 1) throw new Error("Unauthorized!");
      request.user = { userId, accessLevelId };

      return next();
    } catch ({ message }) {
      return response.status(401).json({ message });
    }
  }
};

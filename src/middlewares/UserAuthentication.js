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
    const authorization = request.headers.authorization;

    if (!authorization)
      throw new service.ErrorInstance.Unauthorized("Unauthorized!");

    const [, token] = authorization.split(" ");

    const { accessLevelId, userId } =
      service.Authentication.tokenVerify(token).tokenDecode(token);

    request.user = { userId, accessLevelId };

    return next();
  }

  static async ensureAdminLevel(request, response, next) {
    const authorization = request.headers.authorization;

    if (!authorization)
      throw new service.ErrorInstance.Unauthorized("Unauthorized!");
    const [, token] = authorization.split(" ");

    const { accessLevelId, userId } =
      service.Authentication.tokenVerify(token).tokenDecode(token);

    if (accessLevelId !== 1)
      throw new service.ErrorInstance.Unauthorized("Unauthorized!");
    request.user = { userId, accessLevelId };

    return next();
  }
};

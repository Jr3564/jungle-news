const TokenHandler = require("./authFeatures/TokenHandler");
const { Unauthorized } = require("./ErrorInstance");

module.exports = class {
  static tokenVerify(token) {
    if (!token) throw new Unauthorized("Token is required");

    const secret = process.env.TOKEN_SECRET;

    const isTokenValid = TokenHandler.isValidToken(token, secret);

    if (!isTokenValid) throw new Unauthorized("Invalid token");

    return this;
  }

  static tokenDecode(token) {
    if (!token) throw new Unauthorized("Token is required");

    const secret = process.env.TOKEN_SECRET;

    return TokenHandler.tokenDecode(token, secret);
  }
};

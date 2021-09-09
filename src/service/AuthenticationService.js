const TokenHandler = require("../utils/TokenHandler");

module.exports = class {
  static tokenVerify(token) {
    if (!token) throw new Error("Inválid token");

    const secret = process.env.TOKEN_SECRET;

    const isTokenValid = TokenHandler.isValidToken(token, secret);

    if (!isTokenValid) throw new Error("Unauthorized");

    return this;
  }

  static tokenDecode(token) {
    if (!token) throw new Error("Inválid token");

    const secret = process.env.TOKEN_SECRET;

    return TokenHandler.tokenDecode(token, secret);
  }
};

const { sign, verify, decode } = require("jsonwebtoken");

module.exports = class {
  static defaultCallbackError(err) {
    return !err;
  }

  static tokenGenerate(user, secret) {
    return sign(user, secret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
  }

  static isValidToken(token, secret, callback = this.defaultCallbackError) {
    return verify(token, secret, callback);
  }

  static tokenDecode(token, secret) {
    return decode(token, secret);
  }
};

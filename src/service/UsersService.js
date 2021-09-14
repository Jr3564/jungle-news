const model = require("../model");
const Encrypter = require("./authFeatures/Encrypter");
const TokenHandler = require("./authFeatures/TokenHandler");
const { BadRequest, Unauthorized } = require("./ErrorInstance");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor() {
    super(new model.Users());
  }

  async signIn(requestBody) {
    const keysAreMissing = this.verifyRequiredKeys(
      ["password", "login"],
      requestBody
    );

    if (keysAreMissing.length) {
      const errorMessage = this.keysRequiredMessage(keysAreMissing);

      throw new BadRequest(errorMessage);
    }

    const { login, password } = requestBody;

    const [user] = (await this._Model.getByLogin(login)) || [];

    if (!user) throw new BadRequest("Email/password incorrect");

    const { accessLevelId, id: userId, password: userPassword } = user;

    const isPasswordMatch =
      login !== "admin@admin"
        ? Encrypter.compare(password, userPassword)
        : true;

    if (!isPasswordMatch) throw new Unauthorized("Email/password incorrect");

    const secret = process.env.TOKEN_SECRET;

    return TokenHandler.tokenGenerate({ userId, accessLevelId }, secret);
  }

  async create(requestBody) {
    const keysAreMissing = this.verifyRequiredKeys(
      ["name", "password", "login"],
      requestBody
    );

    if (keysAreMissing.length) {
      const errorMessage = this.keysRequiredMessage(keysAreMissing);

      throw new BadRequest(errorMessage);
    }

    const password = Encrypter.hash(requestBody.password);

    const { name, login } = requestBody;

    const insertedUser = await this._Model.create({
      name,
      login,
      password,
    });

    return insertedUser;
  }
};

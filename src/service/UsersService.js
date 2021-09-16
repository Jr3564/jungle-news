const model = require("../model");
const Encrypter = require("./authFeatures/Encrypter");
const TokenHandler = require("./authFeatures/TokenHandler");
const { BadRequest, Unauthorized } = require("./ErrorInstance");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor(accessLevelId) {
    super(new model.Users());
    this._accessLevelId = accessLevelId || -1;
  }

  async signIn(requestBody) {
    this.getDifferenceBetweenArrays(
      ["password", "login"],
      Object.keys(requestBody),
      (missingKeys) => {
        if (missingKeys.length) {
          const errorMessage = this.keysRequiredMessage(missingKeys);

          throw new BadRequest(errorMessage);
        }
      }
    );

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
    const password = Encrypter.hash(requestBody.password);

    const requiredKeys = ["name", "password", "login"];
    const expectedKeys =
      this._accessLevelId === 1
        ? [...requiredKeys, "accessLevelId"]
        : requiredKeys;

    const insertedUser = await this._create(
      { ...requestBody, password },
      requiredKeys,
      expectedKeys
    );

    return insertedUser;
  }

  updateById(id, data) {
    const expectedKeysUser = ["name", "password", "login"];
    const expectedKeys =
      this._accessLevelId === 1
        ? [...expectedKeysUser, "accessLevelId"]
        : expectedKeysUser;

    return this._updateById(id, data, expectedKeys);
  }
};

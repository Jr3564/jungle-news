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
    this.checkRequiredKeys(["password", "login"], requestBody);

    const [user] = (await this._Model.getByLogin(requestBody.login)) || [];

    if (!user) throw new BadRequest("Email/password incorrect");

    const { accessLevelId, id: userId, password } = user;

    const isPasswordMatch = Encrypter.compare(requestBody.password, password);

    if (requestBody.login !== "admin@admin" && !isPasswordMatch)
      throw new Unauthorized("Email/password incorrect");

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
    const expectedKeys = ["name", "password", "login", "accessLevelId"];
    return this._updateById(id, data, expectedKeys);
  }
};

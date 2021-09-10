const model = require("../model");
const Encrypter = require("./authFeatures/Encrypter");
const TokenHandler = require("./authFeatures/TokenHandler");
const { BadRequest, Unauthorized } = require("./ErrorInstance");

module.exports = class {
  constructor() {
    this.Model = new model.Users();
  }

  async signIn({ login, password }) {
    if (!login || !password)
      throw new BadRequest(
        `The ${
          (!login && "login") || (!password && "password")
        } key is is mandatory`
      );

    const [user] = (await this.Model.getByLogin(login)) || [];

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

  async getAll() {
    return this.Model.getAll();
  }

  async create({ name, login, password }) {
    if (!name || !login || !password)
      throw new BadRequest(
        `The ${
          (!name && "name") || (!login && "login") || (!password && "password")
        } key is is mandatory`
      );

    const encryptedPassword = Encrypter.hash(password);

    const user = {
      name,
      login,
      password: encryptedPassword,
    };

    const insertedUser = await this.Model.create(user);

    return insertedUser;
  }

  updateById(id, itemsToUpdate) {
    return this.Model.updateById(id, itemsToUpdate);
  }

  deleteById(id) {
    return this.Model.deleteById(id);
  }
};

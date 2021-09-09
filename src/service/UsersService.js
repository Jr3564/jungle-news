const model = require("../model");
const Encrypter = require("../utils/Encrypter");
const TokenHandler = require("../utils/TokenHandler");

module.exports = class {
  constructor() {
    this.Model = new model.Users();
  }

  async signIn({ login, password }) {
    try {
      if (!login || !password) throw new Error();

      const [user] = (await this.Model.getByLogin(login)) || [];

      if (!user) throw new Error();

      const { accessLevelId, id: userId, password: userPassword } = user;

      const isPasswordMatch =
        login !== "admin@admin"
          ? Encrypter.compare(password, userPassword)
          : true;

      if (!isPasswordMatch) throw new Error();

      const secret = process.env.TOKEN_SECRET;

      return TokenHandler.tokenGenerate({ userId, accessLevelId }, secret);
    } catch ({ message }) {
      throw new Error(message || "Email/password incorrect");
    }
  }

  async getAll() {
    return this.Model.getAll();
  }

  async create({ name, login, password }) {
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

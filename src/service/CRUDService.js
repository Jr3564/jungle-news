const { BadRequest, UnprocessableEntity } = require("./ErrorInstance.js");

module.exports = class {
  constructor(Model) {
    this._Model = Model;
  }

  getAll() {
    return this._Model.getAll();
  }

  verifyRequiredKeys(verifyKeys, obj) {
    const objectKeys = Object.keys(obj);
    return verifyKeys.filter((key) => !objectKeys.includes(key));
  }

  keysRequiredMessage(keys = []) {
    const missingKeys = keys.reduce((word, key) => {
      return `${word}, ${key}`;
    });
    return `${missingKeys} ${keys.length > 1 ? "are" : "is"} required`;
  }

  _create(requestBody, keysRequired) {
    const keysAreMissing = this.verifyRequiredKeys(keysRequired, requestBody);

    if (keysAreMissing.length) {
      const errorMessage = this.keysRequiredMessage(keysAreMissing);

      throw new BadRequest(errorMessage);
    }

    return this._Model.create(requestBody);
  }

  async updateById(id, data) {
    if (!Object.keys(data).length) throw new BadRequest("'Body' is empty");
    const updated = await this._Model.updateById(id, data);
    if (!updated) throw new UnprocessableEntity("Id not found");
    return updated;
  }

  async deleteById(id) {
    const deleted = await this._Model.deleteById(id);
    if (!deleted.length) throw new UnprocessableEntity("Id not found");
    return deleted;
  }
};

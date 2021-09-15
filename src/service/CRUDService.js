const { BadRequest, UnprocessableEntity } = require("./ErrorInstance.js");

module.exports = class {
  constructor(Model) {
    this._Model = Model;
  }

  getAll() {
    return this._Model.getAll();
  }

  getDifferenceBetweenArrays(array, anotherArray, callback = () => {}) {
    const items = array.filter((item) => !anotherArray.includes(item));
    callback(items);
    return items;
  }

  keysRequiredMessage(keys = []) {
    const missingKeys = keys.reduce((word, key) => {
      return `${word}, ${key}`;
    });
    return `${missingKeys} ${keys.length > 1 ? "are" : "is"} required`;
  }

  extractRequiredKeys(expectedKeys, obj) {
    const dataKeys = Object.keys(obj);
    const differences = this.getDifferenceBetweenArrays(dataKeys, expectedKeys);

    return dataKeys.reduce(
      (newObj, key) =>
        differences.includes(key) ? newObj : { ...newObj, [key]: obj[key] },
      {}
    );
  }

  _create(requestBody, keysRequired) {
    this.getDifferenceBetweenArrays(
      keysRequired,
      Object.keys(requestBody),
      (missingKeys) => {
        if (missingKeys.length) {
          const errorMessage = this.keysRequiredMessage(missingKeys);

          throw new BadRequest(errorMessage);
        }
      }
    );

    return this._Model.create(requestBody);
  }

  async _updateById(id, data) {
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

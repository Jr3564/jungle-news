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

  extractExpectedKeys(expectedKeys, obj) {
    const dataKeys = Object.keys(obj);
    const differences = this.getDifferenceBetweenArrays(dataKeys, expectedKeys);

    return dataKeys.reduce(
      (newObj, key) =>
        differences.includes(key) && obj[key]
          ? newObj
          : { ...newObj, [key]: obj[key] },
      {}
    );
  }

  _create(requestBody, keysRequired, expectedKeys = []) {
    const cleanData = expectedKeys.length
      ? this.extractExpectedKeys(expectedKeys, requestBody)
      : this.extractExpectedKeys(keysRequired, requestBody);
    this.getDifferenceBetweenArrays(
      keysRequired,
      Object.keys(cleanData),
      (missingKeys) => {
        if (missingKeys.length) {
          const errorMessage = this.keysRequiredMessage(missingKeys);

          throw new BadRequest(errorMessage);
        }
      }
    );

    return this._Model.create(cleanData);
  }

  async _updateById(id, data, expectedKeys = []) {
    const cleanData = expectedKeys.length
      ? this.extractExpectedKeys(expectedKeys, data)
      : data;

    if (!Object.keys(cleanData).length) throw new BadRequest("Invalid fields");

    const updated = await this._Model.updateById(id, cleanData);

    if (!updated) throw new UnprocessableEntity("Not found");
    return updated;
  }

  async deleteById(id) {
    const deleted = await this._Model.deleteById(id);
    if (!deleted.length) throw new UnprocessableEntity("Not found");
    return deleted;
  }
};

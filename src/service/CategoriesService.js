const model = require("../model");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor() {
    super(new model.Categories());
  }

  async create(requestBody) {
    return this._create(requestBody, ["name"]);
  }

  updateById(id, data) {
    const expectedKeys = ["name"];

    return this._updateById(id, data, expectedKeys);
  }
};

const model = require("../model");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor() {
    super(new model.Authors());
  }

  async create(requestBody) {
    const requiredKeys = ["name", "imagePath"];
    return this._create(requestBody, requiredKeys);
  }

  updateById(id, data) {
    const expectedKeys = ["name", "imagePath"];

    return this._updateById(id, data, expectedKeys);
  }
};

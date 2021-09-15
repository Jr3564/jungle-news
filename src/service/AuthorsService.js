const model = require("../model");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor() {
    super(new model.Authors());
  }

  async create({ name, imagePath }) {
    const requiredKeys = ["name", "imagePath"];
    return this._create({ name, imagePath }, requiredKeys);
  }

  updateById(id, data) {
    const expectedKeys = ["name", "imagePath"];

    const cleanData = this.extractRequiredKeys(expectedKeys, data);

    return this._updateById(id, cleanData);
  }
};

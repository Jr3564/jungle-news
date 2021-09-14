const model = require("../model");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor() {
    super(new model.Authors());
  }

  async create(requestBody) {
    return this._create(requestBody, ["name", "imagePath"]);
  }
};

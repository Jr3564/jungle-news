const model = require("../model");
const CRUDService = require("./CRUDService");

const { UnprocessableEntity } = require("./ErrorInstance.js");

module.exports = class extends CRUDService {
  constructor() {
    super(new model.Categories());
  }

  async create({ name }) {
    return this._create({ name }, ["name"]);
  }

  updateById(id, { name }) {
    if (!name) throw new UnprocessableEntity("'name' cannot be undefined");
    return this._updateById(id, { name });
  }
};

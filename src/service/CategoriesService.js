const model = require("../model");
const { BadRequest } = require("./ErrorInstance");

module.exports = class {
  constructor() {
    this.Model = new model.Categories();
  }

  async create({ name }) {
    if (!name) throw new BadRequest('The "name" key is is mandatory');
    return this.Model.create(name);
  }

  getAll() {
    return this.Model.getAll();
  }

  updateById(id, data) {
    return this.Model.updateById(id, data);
  }

  deleteById(id) {
    return this.Model.deleteById(id);
  }
};

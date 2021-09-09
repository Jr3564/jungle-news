const model = require("../model");

module.exports = class {
  constructor() {
    this.Model = new model.Categories();
  }

  async create({ name }) {
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

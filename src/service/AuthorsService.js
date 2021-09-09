const model = require("../model");

module.exports = class {
  constructor() {
    this.Model = new model.Authors();
  }

  async create({ name, imagePath }) {
    return this.Model.create({ name, imagePath });
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

const model = require("../model");
const { BadRequest } = require("./ErrorInstance");

module.exports = class {
  constructor() {
    this.Model = new model.Authors();
  }

  async create({ name, imagePath }) {
    if (!name || !imagePath)
      throw new BadRequest(
        `The ${
          (!name && "name") || (!imagePath && "imagePath")
        } key is is mandatory`
      );
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

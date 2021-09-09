const Model = require("./ormModel");

class Categories extends Model {
  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "cat_id";
  }
}

module.exports = Categories;

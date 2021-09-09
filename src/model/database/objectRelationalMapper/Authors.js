const Model = require("./ormModel");

class Authors extends Model {
  static get tableName() {
    return "authors";
  }

  static get idColumn() {
    return "aut_id";
  }
}

module.exports = Authors;

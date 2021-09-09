const Model = require("./ormModel");

class AccessLevels extends Model {
  static get tableName() {
    return "access_levels";
  }
  static get idColumn() {
    return "ace_id";
  }
}

module.exports = AccessLevels;

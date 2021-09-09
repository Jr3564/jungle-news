const Model = require("./ormModel");

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "use_id";
  }

  static get relationMappings() {
    return {
      access_level: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: "access_levels.ace_id",
          to: "users.access_level_id",
        },
      },
    };
  }
}

module.exports = Users;

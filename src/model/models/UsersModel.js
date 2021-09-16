const Users = require("../database/objectRelationalMapper/Users");
const CRUDModel = require("./CRUDModel");

module.exports = class extends CRUDModel {
  constructor() {
    super(Users);
    this.keysMap = {
      name: "use_name",
      id: "use_id",
      login: "use_login",
      password: "use_password",
      accessLevelName: "ace_name",
      accessLevelId: "access_level_id",
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
    this.defaultReturnKeys = Object.keys(this.keysMap);
  }

  async create(newUser) {
    const {
      use_id: id,
      use_name: name,
      use_login: login,
      access_level_id: accessLevelId,
    } = await this._insert(this.mapAndTranslateKeys(newUser, this.keysMap));
    return { id, name, login, accessLevelId };
  }

  getAll() {
    const returnKeys = this.keysRename(
      ["name", "id", "login", "accessLevelName"],
      this.keysMap
    );
    return this._Instance
      .query()
      .innerJoin(
        "access_levels as accessLevel",
        "users.access_level_id",
        "accessLevel.ace_id"
      )
      .select(...returnKeys);
  }

  getByLogin(userLogin) {
    const returnKeys = this.keysRename(
      ["name", "id", "login", "accessLevelName", "password", "accessLevelId"],
      this.keysMap
    );

    return this._Instance
      .query()
      .where("use_login", userLogin)
      .innerJoin(
        "access_levels as accessLevel",
        "users.access_level_id",
        "accessLevel.ace_id"
      )
      .select(returnKeys);
  }

  updateById(userId, keyValue) {
    const returnKeys = this.keysRename(
      ["id", "login", ...Object.keys(keyValue)],
      this.keysMap
    );

    return this._Instance
      .query()
      .where(this.keysMap.id, userId)
      .patch(this.mapAndTranslateKeys(keyValue, this.keysMap))
      .returning(returnKeys)
      .first();
  }

  deleteById(userId) {
    const returnKeys = this.keysRename(
      ["id", "login", "name", "accessLevelId"],
      this.keysMap
    );
    return this._deleteByKeyValue(this.keysMap.id, userId, returnKeys);
  }
};

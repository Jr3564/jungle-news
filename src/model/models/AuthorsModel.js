const Authors = require("../database/objectRelationalMapper/Authors");
const CRUDModel = require("./CRUDModel");

module.exports = class extends CRUDModel {
  constructor() {
    super(Authors);
    this.keysMap = {
      name: "aut_name",
      id: "aut_id",
      imagePath: "aut_image_path",
      createdAt: "created_at",
      updatedAt: "updated_at",
    };

    this.defaultReturnKeys = ["id", "name", "imagePath"];
  }

  create(author) {
    return this._insert(this.mapAndTranslateKeys(author, this.keysMap));
  }

  getAll() {
    const keysReturn = this.keysRename(this.defaultReturnKeys, this.keysMap);
    return this._Instance.query().select(...keysReturn);
  }
  updateById(id, data) {
    const returnKeys = this.keysRename(this.defaultReturnKeys, this.keysMap);

    return this._Instance
      .query()
      .where(this.keysMap.id, id)
      .patch(this.mapAndTranslateKeys(data, this.keysMap))
      .returning(returnKeys)
      .first();
  }
  deleteById(id) {
    const returnKeys = this.keysRename(["id", "name"], this.keysMap);
    return this._deleteByKeyValue(this.keysMap.id, id, returnKeys);
  }
};

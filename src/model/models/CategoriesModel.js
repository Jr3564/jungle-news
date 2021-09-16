const Categories = require("../database/objectRelationalMapper/Categories");
const CRUDModel = require("./CRUDModel");

module.exports = class extends CRUDModel {
  constructor() {
    super(Categories);
    this.keysMap = {
      name: "cat_name",
      id: "cat_id",
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
    this.defaultReturnKeys = ["id", "name"];
  }
  async create(categoryName) {
    const { cat_id: id, cat_name: name } = await this._insert(
      this.mapAndTranslateKeys({ name: categoryName.name }, this.keysMap)
    );
    return { id, name };
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

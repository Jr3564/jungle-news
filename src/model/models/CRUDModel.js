module.exports = class {
  constructor(ORMInstance) {
    this._Instance = ORMInstance;
  }

  keysRename(keysList, keysMap) {
    return keysList.map((key) => `${keysMap[key]} as ${key}`);
  }

  mapAndTranslateKeys(obj, keysMap) {
    return Object.entries(obj).reduce((newObj, [key, value]) => {
      return { ...newObj, [keysMap[key]]: value };
    }, {});
  }

  _insert(item, returnKeys = ["*"]) {
    return this._Instance.query().insert(item).returning(returnKeys);
  }
  _getAll() {
    return this._Instance.query();
  }
  _getById(id, returnKeys = ["*"]) {
    return this._Instance
      .query()
      .findById(id)
      .select(...returnKeys);
  }

  _updateByKeyValue(idDBKey, valueKey, newData, returnKeys = ["*"]) {
    return this._Instance
      .query()
      .where(idDBKey, valueKey)
      .patch(newData)
      .returning(...returnKeys)
      .first();
  }

  _deleteByKeyValue(key, value, returnKeys = ["*"]) {
    return this._Instance
      .query()
      .delete()
      .where(key, value)
      .returning(...returnKeys);
  }
};

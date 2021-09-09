const AccessLevels = require("../database/objectRelationalMapper/AccessLevels");
const CRUDModel = require("./CRUDModel");

module.exports = class extends CRUDModel {
  constructor() {
    super(AccessLevels);
  }
};

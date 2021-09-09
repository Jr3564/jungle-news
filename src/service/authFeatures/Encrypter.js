const bcrypt = require("bcryptjs");

module.exports = class {
  static hash(word) {
    return bcrypt.hashSync(word);
  }
  static compare(item1, item2) {
    return bcrypt.compareSync(item1, item2);
  }
};

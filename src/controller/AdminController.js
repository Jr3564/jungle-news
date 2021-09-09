const AdminControllers = require("./AdminControllers");

module.exports = class {
  static get Articles() {
    return AdminControllers.Articles;
  }
  static get Authors() {
    return AdminControllers.Authors;
  }
  static get Categories() {
    return AdminControllers.Categories;
  }
  static get Users() {
    return AdminControllers.Users;
  }
};

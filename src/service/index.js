const Articles = require("./ArticlesService");
const Categories = require("./CategoriesService");
const Authors = require("./AuthorsService");
const Users = require("./UsersService");
const Authentication = require("./AuthenticationService");
const ErrorInstance = require("./ErrorInstance");
const statusCodes = require("./statusCodes");

module.exports = {
  Articles,
  Categories,
  Authors,
  Users,
  Authentication,
  ErrorInstance,
  statusCodes,
};

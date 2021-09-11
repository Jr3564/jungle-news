const login = require("./loginRoute");
const signUp = require("./signUpRoute");
const articles = require("./articlesRoute");
const categories = require("./categoriesRoute");
const authors = require("./authorsRoute");
const admin = require("./adminRoute");

module.exports = {
  login,
  signUp,
  articles,
  categories,
  authors,
  admin,
};

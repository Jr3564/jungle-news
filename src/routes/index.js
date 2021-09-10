const loginRouteRoute = require("./loginRoute");
const signUpRoute = require("./signUp");
const articlesRoute = require("./articlesRoute");
const categoriesRoute = require("./categoriesRoute");
const authorsRouteRoute = require("./authorsRoute");
const adminRouteRoute = require("./adminRoute");
const middlewares = require("../middlewares");

module.exports = (app) => {
  app.use("/api/login", loginRouteRoute);
  app.use("/api/sign-up", signUpRoute);
  app.use("/api/articles", articlesRoute);
  app.use("/api/categories", categoriesRoute);
  app.use("/api/authors", authorsRouteRoute);
  app.use("/api/admin", adminRouteRoute);
  app.use(middlewares.errorHandler);

  return app;
};

const express = require("express");
const controller = require("../controller");
const middlewares = require("../middlewares");
const rescue = require("express-rescue");

const adminRouter = express.Router();
const ensureAdminLevel = middlewares.UserAuthentication.ensureAdminLevel;
const { Articles, Categories, Authors, Users } = controller.AdminController;

adminRouter
  .route("/articles")
  .get(ensureAdminLevel, rescue(Articles.getAll))
  .post(ensureAdminLevel, rescue(Articles.create));
adminRouter
  .route("/articles/:id")
  .put(ensureAdminLevel, rescue(Articles.update))
  .delete(ensureAdminLevel, rescue(Articles.delete));

adminRouter
  .route("/categories")
  .get(ensureAdminLevel, rescue(Categories.getAll))
  .post(ensureAdminLevel, rescue(Categories.create));
adminRouter
  .route("/categories/:id")
  .put(ensureAdminLevel, rescue(Categories.update))
  .delete(ensureAdminLevel, rescue(Categories.delete));

adminRouter
  .route("/authors")
  .get(ensureAdminLevel, rescue(Authors.getAll))
  .post(ensureAdminLevel, rescue(Authors.create));
adminRouter
  .route("/authors/:id")
  .put(ensureAdminLevel, rescue(Authors.update))
  .delete(ensureAdminLevel, rescue(Authors.delete));

adminRouter
  .route("/users")
  .get(ensureAdminLevel, rescue(Users.getAll))
  .post(ensureAdminLevel, rescue(Users.create));

adminRouter
  .route("/users/:id")
  .put(ensureAdminLevel, rescue(Users.update))
  .delete(ensureAdminLevel, rescue(Users.delete));

adminRouter.use(middlewares.errorHandler);

module.exports = adminRouter;

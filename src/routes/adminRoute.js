const express = require("express");
const controller = require("../controller");
const middlewares = require("../middlewares");
const rescue = require("express-rescue");

const adminRouter = express.Router();
const ensureAdminLevel = middlewares.UserAuthentication.ensureAdminLevel;
const { Articles, Categories, Authors, Users } = controller.AdminController;

adminRouter
  .route("/articles")
  .get(rescue(ensureAdminLevel), rescue(Articles.getAll))
  .post(rescue(ensureAdminLevel), rescue(Articles.create));
adminRouter
  .route("/articles/:id")
  .put(rescue(ensureAdminLevel), rescue(Articles.update))
  .delete(rescue(ensureAdminLevel), rescue(Articles.delete));

adminRouter
  .route("/categories")
  .get(rescue(ensureAdminLevel), rescue(Categories.getAll))
  .post(rescue(ensureAdminLevel), rescue(Categories.create));
adminRouter
  .route("/categories/:id")
  .put(rescue(ensureAdminLevel), rescue(Categories.update))
  .delete(rescue(ensureAdminLevel), rescue(Categories.delete));

adminRouter
  .route("/authors")
  .get(rescue(ensureAdminLevel), rescue(Authors.getAll))
  .post(rescue(ensureAdminLevel), rescue(Authors.create));
adminRouter
  .route("/authors/:id")
  .put(rescue(ensureAdminLevel), rescue(Authors.update))
  .delete(rescue(ensureAdminLevel), rescue(Authors.delete));

adminRouter
  .route("/users")
  .get(rescue(ensureAdminLevel), rescue(Users.getAll))
  .post(rescue(ensureAdminLevel), rescue(Users.create));

adminRouter
  .route("/users/:id")
  .put(rescue(ensureAdminLevel), rescue(Users.update))
  .delete(rescue(ensureAdminLevel), rescue(Users.delete));

adminRouter.use(middlewares.errorHandler);

module.exports = adminRouter;

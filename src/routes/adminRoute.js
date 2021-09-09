const express = require("express");
const controller = require("../controller");
const middlewares = require("../middlewares");

const adminRouter = express.Router();
const ensureAdminLevel = middlewares.UserAuthentication.ensureAdminLevel;
const { Articles, Categories, Authors, Users } = controller.AdminController;

adminRouter
  .route("/articles")
  .get(ensureAdminLevel, Articles.getAll)
  .post(ensureAdminLevel, Articles.create);
adminRouter
  .route("/articles/:id")
  .put(ensureAdminLevel, Articles.update)
  .delete(ensureAdminLevel, Articles.delete);

adminRouter
  .route("/categories")
  .get(ensureAdminLevel, Categories.getAll)
  .post(ensureAdminLevel, Categories.create);
adminRouter
  .route("/categories/:id")
  .put(ensureAdminLevel, Categories.update)
  .delete(ensureAdminLevel, Categories.delete);

adminRouter
  .route("/authors")
  .get(ensureAdminLevel, Authors.getAll)
  .post(ensureAdminLevel, Authors.create);
adminRouter
  .route("/authors/:id")
  .put(ensureAdminLevel, Authors.update)
  .delete(ensureAdminLevel, Authors.delete);

adminRouter
  .route("/users")
  .get(ensureAdminLevel, Users.getAll)
  .post(ensureAdminLevel, Users.create);

adminRouter
  .route("/users/:id")
  .put(ensureAdminLevel, Users.update)
  .delete(ensureAdminLevel, Users.delete);

module.exports = adminRouter;

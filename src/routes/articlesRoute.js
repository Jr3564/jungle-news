const express = require("express");
const controller = require("../controller");
const middlewares = require("../middlewares");
const rescue = require("express-rescue");

const articlesRouter = express.Router();

const ArticlesController = controller.Articles;

const verifyAccessLevel = middlewares.UserAuthentication.verifyAccessLevel;

articlesRouter
  .route("/")
  .get(verifyAccessLevel, rescue(ArticlesController.getAll));

articlesRouter
  .route("/:id")
  .get(verifyAccessLevel, rescue(ArticlesController.getById));

articlesRouter.use(middlewares.errorHandler);

module.exports = articlesRouter;

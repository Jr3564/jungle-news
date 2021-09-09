const express = require("express");
const controller = require("../controller");
const middlewares = require("../middlewares");

const articlesRouter = express.Router();

const ArticlesController = controller.Articles;

const verifyAccessLevel = middlewares.UserAuthentication.verifyAccessLevel;

articlesRouter.route("/").get(verifyAccessLevel, ArticlesController.getAll);

articlesRouter.route("/:id").get(verifyAccessLevel, ArticlesController.getById);

module.exports = articlesRouter;

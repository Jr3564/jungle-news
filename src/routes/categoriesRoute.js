const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");
const middlewares = require("../middlewares");

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(rescue(controller.Categories.getAll));

categoriesRouter.use(middlewares.errorHandler);

module.exports = categoriesRouter;

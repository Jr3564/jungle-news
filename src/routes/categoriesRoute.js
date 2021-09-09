const express = require("express");
const controller = require("../controller");

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(controller.Categories.getAll);

module.exports = categoriesRouter;

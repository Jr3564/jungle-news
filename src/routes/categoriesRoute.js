const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(rescue(controller.Categories.getAll));

module.exports = categoriesRouter;

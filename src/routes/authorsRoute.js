const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");
const middlewares = require("../middlewares");

const authorRouter = express.Router();

authorRouter.route("/").get(rescue(controller.Authors.getAll));

authorRouter.use(middlewares.errorHandler);

module.exports = authorRouter;

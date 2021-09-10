const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");

const authorRouter = express.Router();

authorRouter.route("/").get(rescue(controller.Authors.getAll));

module.exports = authorRouter;

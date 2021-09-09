const express = require("express");
const controller = require("../controller");

const authorRouter = express.Router();

authorRouter.route("/").get(controller.Authors.getAll);

module.exports = authorRouter;

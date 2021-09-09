const express = require("express");
const controller = require("../controller");

const singUpRouter = express.Router();

singUpRouter.route("/").post(controller.Users.create);

module.exports = singUpRouter;

const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");

const singUpRouter = express.Router();

singUpRouter.route("/").post(rescue(controller.Users.create));

module.exports = singUpRouter;

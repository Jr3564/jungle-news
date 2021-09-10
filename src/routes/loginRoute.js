const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");

const loginRouter = express.Router();

loginRouter.route("/").post(rescue(controller.Users.singIn));

module.exports = loginRouter;

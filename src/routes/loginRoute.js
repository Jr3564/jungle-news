const express = require("express");
const controller = require("../controller");

const loginRouter = express.Router();

loginRouter.route("/").post(controller.Users.singIn);

module.exports = loginRouter;

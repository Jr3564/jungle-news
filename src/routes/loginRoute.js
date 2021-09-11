const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");
const middlewares = require("../middlewares");

const loginRouter = express.Router();

loginRouter.route("/").post(rescue(controller.Users.singIn));

loginRouter.use(middlewares.errorHandler);

module.exports = loginRouter;

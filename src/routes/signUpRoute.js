const express = require("express");
const controller = require("../controller");
const rescue = require("express-rescue");
const middlewares = require("../middlewares");

const singUpRouter = express.Router();

singUpRouter.route("/").post(rescue(controller.Users.create));
singUpRouter.use(middlewares.errorHandler);

module.exports = singUpRouter;

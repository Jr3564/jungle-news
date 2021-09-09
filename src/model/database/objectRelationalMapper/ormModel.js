const { Model } = require("objection");
const config = require("../knex/knexfile");
const Knex = require("knex")(config);

Model.knex(Knex);

module.exports = Model;

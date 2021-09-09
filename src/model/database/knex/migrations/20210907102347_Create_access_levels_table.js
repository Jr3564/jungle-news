exports.up = function (knex) {
  return knex.schema.createTable("access_levels", (table) => {
    table.increments("ace_id").primary();
    table.string("ace_name", 150).notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("access_levels");
};

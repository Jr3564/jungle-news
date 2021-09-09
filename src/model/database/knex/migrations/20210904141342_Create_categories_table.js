exports.up = function (knex) {
  return knex.schema.createTable("categories", (table) => {
    table.increments("cat_id").primary();
    table.string("cat_name", 150).notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};

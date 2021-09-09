exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("use_id").primary();
    table.string("use_name", 255);
    table.string("use_login", 255).notNullable().unique();
    table.string("use_password", 255).notNullable();
    table.integer("access_level_id").defaultTo(2);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.foreign("access_level_id").references("access_levels.ace_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

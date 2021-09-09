exports.up = function (knex) {
  return knex.schema.createTable("authors", (table) => {
    table.increments("aut_id").primary();
    table.string("aut_name", 150).notNullable().unique();
    table.string("aut_image_path", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("authors");
};

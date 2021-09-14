exports.up = function (knex) {
  return knex.schema.createTable("articles", (table) => {
    table.increments("art_id").primary();
    table.string("art_title").notNullable().unique();
    table.text("art_paragraph").notNullable();
    table.text("art_summary");
    table.text("art_body");
    table.integer("category_id");
    table.integer("author_id");
    table.foreign("category_id").references("categories.cat_id");
    table.foreign("author_id").references("authors.aut_id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};

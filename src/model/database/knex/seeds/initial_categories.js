exports.seed = function (knex) {
  return knex("categories")
    .del()
    .then(function () {
      return knex("categories").insert([
        { cat_name: "software" },
        { cat_name: "hardware" },
        { cat_name: "science" },
        { cat_name: "films" },
        { cat_name: "comics" },
      ]);
    });
};

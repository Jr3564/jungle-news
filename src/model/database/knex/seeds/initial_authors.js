exports.seed = function (knex) {
  return knex("authors")
    .del()
    .then(function () {
      return knex("authors").insert([
        { aut_name: "Rodolfo", aut_image_path: "./dist" },
      ]);
    });
};

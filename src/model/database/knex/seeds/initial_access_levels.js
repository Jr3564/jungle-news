exports.seed = function (knex) {
  return knex("access_levels")
    .del()
    .then(function () {
      return knex("access_levels").insert([
        { ace_name: "admin" },
        { ace_name: "user" },
      ]);
    });
};

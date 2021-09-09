exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          use_name: "Mr.Admin",
          use_login: "admin@admin",
          use_password: "admin",
          access_level_id: 1,
        },
      ]);
    });
};

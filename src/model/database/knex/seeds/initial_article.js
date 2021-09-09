exports.seed = function (knex) {
  return knex("articles")
    .del()
    .then(function () {
      return knex("articles").insert([
        {
          art_title: "Title",
          art_paragraph: "Paragraph 1",
          art_summary: "this is certainly a summary",
          art_body: "booody",
          author_id: 1,
          category_id: 1,
        },
      ]);
    });
};

const Model = require("./ormModel");
const CategoriesModel = require("./Categories");
const AuthorsModel = require("./Authors");

class Article extends Model {
  static get tableName() {
    return "articles";
  }

  static get idColumn() {
    return "art_id";
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoriesModel,
        join: {
          from: "categories.cat_id",
          to: "articles.category_id",
        },
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: AuthorsModel,
        join: {
          from: "authors.aut_id",
          to: "articles.author_id",
        },
      },
    };
  }
}

module.exports = Article;

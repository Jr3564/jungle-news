const model = require("../model");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor(accessLevelId) {
    super(new model.Articles());
    this._accessLevelId = accessLevelId;
    this._keysReturn = this._accessLevelId
      ? ["title", "summary", "firstParagraph", "body", "category"]
      : ["title", "summary", "firstParagraph", "category"];
  }

  getAll({ category, author, categoryId, authorId }) {
    const keysReturnByQuery = ["title", "summary", "category"];
    if (category || author) {
      return this._Model.getFilteredByCategoryOrAuthor(
        category,
        author,
        keysReturnByQuery
      );
    } else if (categoryId || authorId) {
      return this._Model.getFilteredByCategoryIdOrAuthorId(
        categoryId,
        authorId,
        keysReturnByQuery
      );
    }
    return this._Model.getAll(this._keysReturn);
  }

  getById(articleId) {
    return this._Model.getById(articleId, this._keysReturn);
  }

  create(article) {
    return this._create(article, [
      "title",
      "summary",
      "firstParagraph",
      "body",
      "authorId",
      "categoryId",
    ]);
  }
};

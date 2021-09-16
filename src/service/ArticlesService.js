const model = require("../model");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor(accessLevelId) {
    super(new model.Articles());
    this._accessLevelId = accessLevelId;
    this.anonymousUserKeysReturn = [
      "title",
      "summary",
      "firstParagraph",
      "category",
    ];
    this.loggedUserKeysReturn = [...this.anonymousUserKeysReturn, "body"];
    this.keysReturn = accessLevelId
      ? this.loggedUserKeysReturn
      : this.anonymousUserKeysReturn;
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
    return this._Model.getAll(this.keysReturn);
  }

  getById(articleId) {
    return this._Model.getById(articleId, this.keysReturn);
  }

  create(requestBody) {
    const expectedKeys = [
      "title",
      "summary",
      "body",
      "firstParagraph",
      "categoryId",
      "authorId",
    ];
    return this._create(requestBody, expectedKeys);
  }

  updateById(id, data) {
    const expectedKeys = [
      "title",
      "summary",
      "firstParagraph",
      "category",
      "body",
    ];

    return this._updateById(id, data, expectedKeys);
  }
};

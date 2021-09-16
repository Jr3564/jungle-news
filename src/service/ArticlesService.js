const model = require("../model");
const CRUDService = require("./CRUDService");

module.exports = class extends CRUDService {
  constructor(accessLevelId) {
    super(new model.Articles());
    this._accessLevelId = accessLevelId;
  }

  get _returnKeys() {
    const anonymousReturningKeys = [
      "title",
      "summary",
      "firstParagraph",
      "category",
    ];
    const loggedReturningKeys = [...anonymousReturningKeys, "body"];
    return this._accessLevelId ? loggedReturningKeys : anonymousReturningKeys;
  }

  getAll({ category, author, categoryId, authorId }) {
    if (category || author) {
      return this._Model.getFilteredByCategoryOrAuthor(category, author, [
        "title",
        "summary",
        "category",
      ]);
    } else if (categoryId || authorId) {
      return this._Model.getFilteredByCategoryIdOrAuthorId(
        categoryId,
        authorId,
        ["title", "summary", "category"]
      );
    }
    return this._Model.getAll(this._returnKeys);
  }

  getById(id) {
    return this._getById(id, this._returnKeys);
  }

  create(requestBody) {
    const requiredKeys = [
      "title",
      "summary",
      "body",
      "firstParagraph",
      "categoryId",
      "authorId",
    ];

    return this._create(requestBody, requiredKeys);
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

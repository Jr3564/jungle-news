const model = require("../model");

module.exports = class {
  constructor(accessLevelId) {
    this._Model = new model.Articles();
    this._accessLevelId = accessLevelId;
    this._keysReturn = this._accessLevelId
      ? ["title", "summary", "firstParagraph", "body"]
      : ["title", "summary", "firstParagraph"];
  }

  getAll({ categoryId, authorId }) {
    if (categoryId || authorId) {
      return this._Model.getFilteredByCategoryIdOrAuthorId(
        categoryId,
        authorId,
        this._keysReturn
      );
    } else {
      return this._Model.getAll(this._keysReturn);
    }
  }

  getById(articleId) {
    return this._Model.getById(articleId, this._keysReturn);
  }

  create(article) {
    // Achar um lugar melhor par isso
    const expectedKeys = new Set([
      "title",
      "summary",
      "firstParagraph",
      "body",
      "categoryId",
      "authorId",
    ]);
    const isSuperset = (subset, set) => {
      let isSuper = true;

      for (let key of subset) {
        if (!set.has(key)) {
          isSuper = false;
          break;
        }
      }
      return isSuper;
    };
    // Achar um lugar melhor par isso
    if (!isSuperset(Object.keys(article), expectedKeys))
      throw new Error(
        "Encontrar um erro para dizer que faltaram chaves para criar"
      );

    return this._Model.create(article);
  }

  updateById(articleId, data) {
    return this._Model.updateById(articleId, data);
  }

  deleteById(articleId) {
    return this._Model.deleteById(articleId);
  }
};

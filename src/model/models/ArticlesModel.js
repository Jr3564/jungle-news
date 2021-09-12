const Articles = require("../database/objectRelationalMapper/Articles");
const CRUDModel = require("./CRUDModel");

module.exports = class extends CRUDModel {
  constructor() {
    super(Articles);
    this.keysMap = {
      title: "art_title",
      firstParagraph: "art_paragraph",
      summary: "art_summary",
      body: "art_body",
      categoryId: "category_id",
      category: "cat_name",
      authorId: "author_id",
      id: "art_id",
    };
    this.defaultReturnKeys = ["title", "firstParagraph", "summary", "body"];
  }

  create(data) {
    return this._insert(this.mapAndTranslateKeys(data, this.keysMap));
  }

  defaultQuery(returnKeys, queryBuilder = () => {}) {
    return this._Instance
      .query()
      .innerJoin(
        "categories as category",
        "articles.category_id",
        "category.cat_id"
      )
      .withGraphJoined("author")
      .where(queryBuilder)
      .modifyGraph("author", (builder) => {
        builder
          .select("aut_name as name", "aut_image_path as picture")
          .from("authors");
      })
      .select(returnKeys);
  }

  getById(id, returnKeys) {
    const matchId = (builder) => {
      builder.where("art_id", id);
    };

    return this.defaultQuery(
      this.keysRename(returnKeys, this.keysMap),
      matchId
    );
  }

  getFilteredByKeyValue(key, value, keysReturn) {
    if (key === "author") key = "name";
    const returnKeys = this.keysRename(
      keysReturn || this.defaultReturnKeys,
      this.keysMap
    );

    const matchName = (builder) => {
      builder.where(key, value);
    };

    return this.defaultQuery(returnKeys, matchName);
  }

  getFilteredByCategoryIdOrAuthorId(categoryId, authorId, keysReturn) {
    const returnKeys = this.keysRename(
      keysReturn || this.defaultReturnKeys,
      this.keysMap
    );
    const matchName = (builder) => {
      builder
        .where("category_id", categoryId || -1)
        .orWhere("author_id", authorId || -1);
    };

    return this.defaultQuery(returnKeys, matchName);
  }

  getFilteredByCategoryOrAuthor(category, author, keysReturn) {
    const returnKeys = this.keysRename(
      keysReturn || this.defaultReturnKeys,
      this.keysMap
    );
    const matchName = (builder) => {
      builder
        .where("cat_name", category?.toLowerCase() || "")
        .orWhere("name", author || "");
      return;
    };

    return this.defaultQuery(returnKeys, matchName);
  }

  getAll(keysReturn) {
    const returnKeys = this.keysRename(
      keysReturn || this.defaultReturnKeys,
      this.keysMap
    );

    return this.defaultQuery(returnKeys, () => {});
  }

  updateById(articleId, keyValue) {
    const updatedItems = this.mapAndTranslateKeys(keyValue, this.keysMap);

    const returnKeys = [
      ...this.keysRename(this.defaultReturnKeys, this.keysMap),
      "category_id as categoryId",
      "author_id as authorId",
    ];

    return this._updateByKeyValue(
      "art_id",
      articleId,
      updatedItems,
      returnKeys
    );
  }

  deleteById(articleId) {
    const returnKeys = this.keysRename(this.defaultReturnKeys, this.keysMap);
    return this._deleteByKeyValue("art_id", articleId, returnKeys);
  }
};

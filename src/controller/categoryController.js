const _ = require("lodash");
const Category = require("../database/models/categoryModel");
const { SuccessResponse } = require("./../helpers/apiResponse");
const categoryService = require("./../database/services/categoryService");

const {
  AlreadyExistsError,
  NotFoundError,
} = require("./../errorHandling/apiError");

module.exports = {
  getCategory: async (req, res, next) => {
    const categories = await categoryService.getCategories();

    return new SuccessResponse("Categories", { categories: categories }).send(
      res
    );
  },
  addCategory: async (req, res, next) => {
    const category = _.cloneDeep(req.body);
    const categoryName = await Category.doesCategoryExist(category.name);
    if (categoryName) {
      return next(new AlreadyExistsError("Category"));
    }

    const addedCategory = await categoryService.addCategory(category);
    return new SuccessResponse("Category Added", {
      category: addedCategory,
    }).send(res);
  },

  updateCategory: async (req, res, next) => {
    const id = req.params.id;
    const updatedFields = _.cloneDeep(req.body);
    const category = await categoryService.getCategorybyId(id);
    if (category) {
      const updateCategory = await categoryService.updateCategory(
        id,
        updatedFields
      );
      return new SuccessResponse("Category Updated", {
        category: updateCategory,
      }).send(res);
    }
    next(new NotFoundError("Category"));
  },
};

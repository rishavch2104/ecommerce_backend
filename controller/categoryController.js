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
    const category = req.body;
    if (await categoryService.getCategoryByName(category.name)) {
      return next(new AlreadyExistsError("Category"));
    }

    const addedCategory = await categoryService.addCategory(category);
    return new SuccessResponse("Category Added", {
      category: addedCategory,
    }).send(res);
  },

  updateCategory: async (req, res, next) => {
    const id = req.params.id;
    const category = req.body;
    if (await categoryService.getCategorybyId(id)) {
      const updateCategory = await categoryService.updateCategory(id, category);
      return new SuccessResponse("Category Updated", {
        category: updateCategory,
      }).send(res);
    }
    next(new NotFoundError("Category"));
  },
};

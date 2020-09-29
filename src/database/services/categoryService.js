const Category = require("../models/categoryModel");

module.exports = {
  getCategories: () => {
    return Category.find();
  },
  getCategoryByName: (name) => {
    return Category.findOne({ name: name });
  },
  getCategorybyId: (id) => {
    return Category.findById(id);
  },
  addCategory: async (category) => {
    return await Category.create(category);
  },
  updateCategory: (id, category) => {
    return Category.findByIdAndUpdate(
      id,
      { ...category },
      {
        runValidators: true,
        new: true,
      }
    );
  },
};

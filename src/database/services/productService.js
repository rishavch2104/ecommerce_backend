const Products = require("./../models/productModel");

module.exports = {
  getProductByTitle: (title) => {
    return Products.findOne({ title: title });
  },
  addProduct: async (product) => {
    return await Products.create(product);
  },
  getProducts: () => {
    return Products.find();
  },
  getProductById: (id) => {
    return Products.findById(id);
  },
  updateProduct: (id, product) => {
    return Products.findByIdAndUpdate(
      id,
      { ...product },
      { runValidators: true, new: true }
    );
  },
};

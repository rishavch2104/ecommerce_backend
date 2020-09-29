const mongoose = require("mongoose");
const ToJSON = require("../plugins/toJson");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title cannot be less than 3 characters"],
    maxlength: [50, "Title cannot be greater than 50 characters"],
  },
  shortDescription: {
    type: String,
    required: true,
    minlength: [10, "Short description cannot be less than 10 characters"],
    maxlength: [100, "Short description cannot be greater than 100 characters"],
  },
  description: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  reviews: [
    {
      user: { type: String },
      review: {
        type: String,
        minlength: [10, "Review cannot be less than 10 characters"],
        maxlength: [200, "Review cannot be greater than 200 characters"],
      },
      rating: { type: Number },
    },
  ],
});

productSchema.plugin(ToJSON);

productSchema.statics.isTitleTaken = async function (title, excludedUserId) {
  const product = await this.findOne({ title, _id: { $ne: excludedUserId } });
  return !!product;
};
productSchema.statics.doesProductExist = async function (id) {
  const product = await this.findById(id);
  return !!product;
};

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;

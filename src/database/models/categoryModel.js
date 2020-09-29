const mongoose = require("mongoose");
const ToJSON = require("../plugins/toJson");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: "string", minlength: 5, maxlength: 45 },
});

categorySchema.plugin(ToJSON);

categorySchema.statics.doesCategoryExist = async function (
  name,
  excludedUserId
) {
  const category = await this.findOne({ name, _id: { $ne: excludedUserId } });
  return !!category;
};

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;

const mongoose = require("mongoose");
const ToJSON = require("../plugins/toJson");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: "string", minlength: 5, maxlength: 15 },
});

categorySchema.plugin(ToJSON);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;

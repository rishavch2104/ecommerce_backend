const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: "string", minlength: 5, maxlength: 15 },
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;

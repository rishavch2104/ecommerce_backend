const mongoose = require("mongoose");
const ToJSON = require("../plugins/toJson");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  item: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Schema.Types.Number },
    },
  ],
  orderDate: { type: Date },
  shipped: { type: Date },
});

OrderSchema.plugin(ToJSON);
const orderModel = mongoose.model("Orders", OrderSchema);

module.exports = orderModel;

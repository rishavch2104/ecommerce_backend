const mongoose = require("mongoose");

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

const orderModel = mongoose.model("Orders", orderSchema);

module.exports = orderModel;

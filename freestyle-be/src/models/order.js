const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    itemID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    address: String,
    payment: String,
    subTotal: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

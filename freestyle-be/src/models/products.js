const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: String,
  productDesc: String,
  productImage: String,
  currency: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

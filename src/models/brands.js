const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  BrandName: String,
  BrandDesc: String,
  brandImage: String,
});

const Brands = mongoose.model("Brands", brandSchema);
module.exports = Brands;

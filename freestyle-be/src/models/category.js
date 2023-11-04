const mongoose = require("mongoose");
const catSchema = new mongoose.Schema({
  CatName: String,
  CatDesc: String,
  CatSales: Number,
  catImage: String,
});

const Categories = mongoose.model("Categories", catSchema);
module.exports = Categories;

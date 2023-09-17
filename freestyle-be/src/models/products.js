const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: String,
    productDesc: String,
   

  });
   
  const Product = mongoose.model('Products', productSchema);
  module.exports = Product;
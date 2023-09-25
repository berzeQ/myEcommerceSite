const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const path = require("path");
const fs = require("fs");

const GetAllProducts = async (req, res) => {
  const productDetails = await Product.find();
  if (productDetails) {
    res.json({ productDetails });
  }
};

const CreateNewProduct = async (req, res) => {
  req.body.productImage = req.file?.filename;
  console.log(req.body, req.file);
  await Product.create(req.body);
  res.status(200).json({ msg: "Product has been added " });
};

const getProductImage = async (req, res) => {
  const productInfo = await Product.findById(req.params.id);
  const imagePath = path.join(
    __dirname,
    "../../uploads/productsImage/",
    productInfo.productImage
  );
  console.log(productInfo);
  console.log(imagePath, "hello");
  res.sendFile(imagePath);
};

module.exports = { GetAllProducts, CreateNewProduct, getProductImage };

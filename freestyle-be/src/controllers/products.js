const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const path = require("path");
const fs = require("fs");

const GetAllProducts = async (req, res) => {
  const productDetails = await Product.find().limit(8);
  if (productDetails) {
    res.json({ productDetails });
  }
};
const GetSearchProducts = async (req, res) => {
  const query = req.params.query;
  const regex = new RegExp(query, "i"); // Case-insensitive search
  const productList = await Product.find({ productName: regex });
  if (productList) {
    res.json({ productList });
  }
};
const GetAllSearch = async (req, res) => {
  const query = req.params.query;
  const regex = new RegExp(`.*${query}.*`, "i"); // Case-insensitive search
  const productList = await Product.find({ productName: regex });
  if (productList && productList.length > 0) {
    res.json({ productList });
  } else {
    res.json({ msg: "no result found" });
  }
};

const CreateNewProduct = async (req, res) => {
  console.log(req.body);
  console.log(req);

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
const getProductByID = async (req, res) => {
  const productDetail = await Product.findById(req.params.id);
  console.log(req);
  if (productDetail) {
    res.json(productDetail);
  }
};

module.exports = {
  GetAllProducts,
  CreateNewProduct,
  getProductImage,
  GetSearchProducts,
  getProductByID,
  GetAllSearch,
};

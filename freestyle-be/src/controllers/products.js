const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Product = require("../models/products");
const path = require("path");
const fs = require("fs");

const GetTotalProduct = async (req, res) => {
  const productDetails = await Product.countDocuments();

  if (productDetails) {
    res.json({ productDetails });
  }
};
const GetProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get page number from query parameter, default to 1
  const limit = 8; // Number of products per page
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  try {
    const products = await Product.find().skip(skip).limit(limit);
    const totalProductsCount = await Product.countDocuments();

    res.json({ products, totalProductsCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const GetProductsByCat = async (req, res) => {
  const cat = req.params.cat;
  const page = parseInt(req.query.page) || 1; // Get page number from query parameter, default to 1
  console.log(req, cat, page);

  const limit = 8; // Number of products per page
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  try {
    const products = await Product.find({
      productCat: { $regex: new RegExp(`(^|,)${cat}($|,)`, "i") },
    })
      .skip(skip)
      .limit(limit);
    const totalProductsCount = await Product.countDocuments();
    if (products.length > 0) {
      return res.json({ products, totalProductsCount });
    } else {
      return res.json({ msg: "No Result Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  req.body.productImage = req.file?.filename;

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

  res.sendFile(imagePath);
};
const getProductByID = async (req, res) => {
  const productDetail = await Product.findById(req.params.id);
  if (productDetail) {
    res.json(productDetail);
  }
};
const getProductByCat = async (req, res) => {
  console.log(req.params.cat);
  const productDetail = await Product.find({
    productCat: { $regex: new RegExp(`(^|,)${req.params.cat}($|,)`) },
  });
  if (productDetail) {
    console.log(productDetail);
    res.json(productDetail);
  }
};
const getCountOfProductByCat = async (req, res) => {
  console.log(req.params.cat);
  const productCount = await Product.find({
    productCat: { $regex: new RegExp(`(^|,)${req.params.cat}($|,)`, "i") },
  }).countDocuments();

  if (productCount) {
    console.log(productCount);
    res.json(productCount);
  } else {
    console.log("fk me", productCount);
    res.json({ msg: " fk you all" });
  }
};

module.exports = {
  GetProducts,
  CreateNewProduct,
  getProductImage,
  GetSearchProducts,
  getProductByID,
  GetAllSearch,
  GetTotalProduct,
  getProductByCat,
  getCountOfProductByCat,
  GetProductsByCat,
};

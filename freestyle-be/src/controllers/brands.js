const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Brands = require("../models/brands");
const path = require("path");
const fs = require("fs");

const GetAllBrands = async (req, res) => {
  const BrandDetails = await Brands.find();
  if (BrandDetails) {
    res.json({ BrandDetails });
  }
};

const CreateNewBrand = async (req, res) => {
  console.log(req.body);
  console.log(req);

  req.body.brandImage = req.file?.filename;
  console.log(req.body, req.file);

  await Brands.create(req.body);
  res.status(200).json({ msg: "Brand has been added " });
};

const getBrandImage = async (req, res) => {
  const brandInfo = await Brands.findById(req.params.id);
  const imagePath = path.join(
    __dirname,
    "../../uploads/brandsImage/",
    brandInfo.brandImage
  );
  console.log(imagePath, "hello");
  res.sendFile(imagePath);
};

module.exports = { GetAllBrands, CreateNewBrand, getBrandImage };

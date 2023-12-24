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
  req.body.brandImage = req.file?.filename;

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
  res.sendFile(imagePath);
};
const getSpecificBrand = async (req, res) => {
  const brandId = req.params.id;
  console.log(req.params);
  const brand = await Brands.findById(brandId);
  if (brand) {
    res.json(brand);
  }
};
module.exports = {
  GetAllBrands,
  CreateNewBrand,
  getBrandImage,
  getSpecificBrand,
};

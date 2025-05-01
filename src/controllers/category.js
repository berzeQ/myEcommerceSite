const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Categories = require("../models/category");
const path = require("path");
const fs = require("fs");

const GetAllCats = async (req, res) => {
  const CategoryDetails = await Categories.find();
  if (CategoryDetails) {
    res.json({ CategoryDetails });
  }
};

const CreateNewCategory = async (req, res) => {
  req.body.catImage = req.file?.filename;

  await Categories.create(req.body);
  res.status(200).json({ msg: "Category has been added " });
};

const getCatImage = async (req, res) => {
  const catInfo = await Categories.findById(req.params.id);
  const imagePath = path.join(
    __dirname,
    "../../uploads/CategoryImage/",
    catInfo.catImage
  );
  res.sendFile(imagePath);
};

module.exports = { GetAllCats, CreateNewCategory, getCatImage };

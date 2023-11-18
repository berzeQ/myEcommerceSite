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
  console.log(req.body);
  console.log(req);

  req.body.catImage = req.file?.filename;
  console.log(req.body, req.file);

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
  console.log(imagePath, "hello");
  res.sendFile(imagePath);
};

module.exports = { GetAllCats, CreateNewCategory, getCatImage };

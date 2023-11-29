const Image = require("../models/Images");
const path = require("path");
const fs = require("fs");

const CreateImage = async (req, res) => {
  const imageGet = await Image.findOne(req.query);
  // if (err) {
  //   // Handle the error
  //   console.error(err);
  //   return;
  // }
  if (!imageGet) {
    req.body.imagePath = req.file?.filename;
    await Image.create(req.body);
    res.status(200).json({ msg: "Image has been added " });
  } else {
    const changeImg = await Image.findOneAndUpdate(req.query, {
      imagePath: req.file?.filename,
    });
    res.status(200).json({ msg: "Image has been Changed " });
  }
};

const getImage = async (req, res) => {
  const ImageInfo = await Image.findOne({ imageName: req.query.imageName });
  if (ImageInfo) {
    const imagePath1 = path.join(
      __dirname,
      "../../uploads/mainImage/",
      ImageInfo?.imagePath
    );
    res.sendFile(imagePath1);
  }
};

const ChangeImage = async (req, res) => {
  req.body.imagePath = req.file?.filename;
  await Image.create(req.body);
  res.status(200).json({ msg: "Image has been changed " });
};

module.exports = { CreateImage, ChangeImage, getImage };

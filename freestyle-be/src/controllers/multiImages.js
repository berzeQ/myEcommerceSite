const Image = require("../models/Images");
const path = require("path");
const fs = require("fs");

const CreateImage = async (req, res) => {
  console.log(req);
  console.log(req.body, "hello  123");
  console.log(req.file, "bye");
  const imageGet = await Image.findOne(req.query);
  // if (err) {
  //   // Handle the error
  //   console.error(err);
  //   return;
  // }
  console.log(imageGet);
  if (!imageGet) {
    req.body.imagePath = req.file?.filename;
    console.log(req.body, req.file);
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
  console.log(req.query.imageName);
  const ImageInfo = await Image.findOne({ imageName: req.query.imageName });
  if (ImageInfo) {
    console.log(ImageInfo, "dkadjbasdjbasjdb");
    const imagePath1 = path.join(
      __dirname,
      "../../uploads/mainImage/",
      ImageInfo?.imagePath
    );
    console.log(imagePath1, "hello12312312313");
    res.sendFile(imagePath1);
  }
};

const ChangeImage = async (req, res) => {
  req.body.imagePath = req.file?.filename;
  console.log(req.body, req.file);
  await Image.create(req.body);
  res.status(200).json({ msg: "Image has been changed " });
};

module.exports = { CreateImage, ChangeImage, getImage };

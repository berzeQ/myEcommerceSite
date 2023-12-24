const Image = require("../models/Images");
const path = require("path");
const fs = require("fs");
// import { v2 as cloudinary } from "cloudinary";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const UploadImageToCloudinary = async (req, res) => {
  console.log(req, req.file, req.params.publicId);
  const checkIfImageExists = async (publicId) => {
    try {
      const asset = await cloudinary.api.resource(publicId);
      return asset;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const uploadImage = async (imagePath) => {
    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
  };
  const publicId = req.params.publicId;
  const existingImage = await checkIfImageExists(publicId);
  if (existingImage) {
    console.log(existingImage);
    const options = {
      public_id: publicId, // Specify the public ID to overwrite the existing image
      overwrite: true,
    };
    const result = await cloudinary.uploader.upload(req.file.path, options);
    if (result) return res.status(200).json({ msg: "Image has been Changed " });
  }
  // else {
  //   const newPublicId = await uploadImage(req.file.path);
  //   if (newPublicId) {
  //     req.body.imagePath = publicId;

  //     const createImg = await Image.create(req.body);
  //     if (createImg) {
  //       res.status(200).json({ msg: "Image has been added " });
  //     }
  //   }
  // }
};

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
    if (changeImg)
      return res.status(200).json({ msg: "Image has been Changed " });
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

module.exports = {
  CreateImage,
  ChangeImage,
  getImage,
  UploadImageToCloudinary,
};

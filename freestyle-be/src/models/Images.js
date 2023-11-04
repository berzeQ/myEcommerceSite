const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  imageName: String,
  imagePath: String,
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;

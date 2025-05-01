const express = require("express");
const app = express();
const connect = require("./DB/connect");
const User = require("./models/user");
const Product = require("./models/products");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const cloudinary = require("cloudinary");

connect();
require("dotenv").config();
const port = process.env.PORT;

const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/products");
const imageRoute = require("./routes/images");
const brandRoute = require("./routes/addBrands");
const categoryRoute = require("./routes/addCategory");

// const contactRoute=require('./routes/contac');

app.use(userRoute);
app.use(productRoute);
app.use(orderRoute);
app.use(imageRoute);
app.use(brandRoute);
app.use(categoryRoute);

// app.use("/contact",contactRoute )

app.listen(port, () => {
  console.log(`Server is running on localhost ${port}`);
});

// cloudinary.config({
//   cloud_name: "ddaaysabq",
//   api_key: "141582619764743",
//   api_secret: "aauGmuPtTNwgveGNA8LVLe_V55g",
//   secure: true,
// });

// console.log(cloudinary.config);
// /////////////////////////
// // Uploads an image file
// /////////////////////////
// const uploadImage = async (imagePath) => {
//   // Use the uploaded file's name as the asset's public ID and
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }
// };

// /////////////////////////////////////
// // Gets details of an uploaded image
// /////////////////////////////////////
// const getAssetInfo = async (publicId) => {
//   // Return colors in the response
//   const options = {
//     colors: true,
//   };

//   try {
//     // Get details about the asset
//     const result = await cloudinary.api.resource(publicId, options);
//     console.log(result);
//     return result.colors;
//   } catch (error) {
//     console.error(error);
//   }
// };
// //////////////////////////////////////////////////////////////
// // Creates an HTML image tag with a transformation that
// // results in a circular thumbnail crop of the image
// // focused on the faces, applying an outline of the
// // first color, and setting a background of the second color.
// //////////////////////////////////////////////////////////////
// const createImageTag = (publicId, ...colors) => {
//   // Set the effect color and background color
//   const [effectColor, backgroundColor] = colors;

//   // Create an image tag with transformations applied to the src URL
//   let imageTag = cloudinary.image(publicId, {
//     transformation: [
//       { width: 250, height: 250, gravity: "faces", crop: "thumb" },
//       { radius: "max" },
//       { effect: "outline:10", color: effectColor },
//       { background: backgroundColor },
//     ],
//   });

//   return imageTag;
// };
// //////////////////
// //
// // Main function
// //
// //////////////////
// (async () => {
//   // Set the image to upload
//   const imagePath =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRooTDu8lTbMc-eSYA7-Njv2xkqMilCdjBWcg&usqp=CAU";

//   // Upload the image
//   const publicId = await uploadImage(imagePath);

//   // Get the colors in the image
//   const colors = await getAssetInfo(publicId);

//   // Create an image tag, using two of the colors in a transformation
//   const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

//   // Log the image tag to the console
//   console.log(imageTag);
// })();

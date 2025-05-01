const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const cloudinary = require("cloudinary").v2; // Import Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const GetAllUser = async (req, res) => {
  const data = await User.find();
  if (data) {
    res.json({ data });
  }
};

const CreateNewUser = async (req, res) => {
  const plainPW = req.body.password;
  console.log(req.body.password);

  const hashPW = await bcrypt.hash(plainPW, saltRounds);
  req.body.password = hashPW;
  console.log(hashPW);

  const userExist = await User.exists({ phoneNumber: req.body.phoneNumber });

  req.body.role = "User";
  if (userExist == null) {
    const data = User.create(req.body);
    if (data) {
      res.json("User has been created");
    }
  } else {
    res.status(409).json("User already exist ");
  }
};

const LoginUser = async (req, res) => {
  console.log(req.body.phoneNumber);
  const userExist = await User.findOne({ phoneNumber: req.body.phoneNumber });

  if (userExist == null) {
    res.status(404).json("User doesn't exist");
    console.log(userExist);
  } else {
    const isMatched = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    console.log(isMatched);
    if (isMatched) {
      const token = await jwt.sign(
        { phoneNumber: req.body.phoneNumber },
        process.env.SECRET_KEY
      );
      console.log(token);
      console.log(userExist);
      const mutateUser = {
        fullName: userExist.fullName,
        phoneNumber: userExist.phoneNumber,
        email: userExist.email,
        role: userExist.role,
        userCart: userExist.userCart,
        userWishList: userExist.userWishList,
        _id: userExist.id,
        avatar: userExist.avatar,
      };
      console.log(mutateUser);
      // client.messages
      //   .create({
      //     body: "Your account has just logged in ",
      //     from: "+13343668522",
      //     to: userExist.phoneNumber,
      //   })
      //   .then((message) => console.log(message.sid));

      res.status(200).json({
        isLoggedIn: true,
        msg: "User Logged In Successfully",
        token,
        userDetails: mutateUser,
      });
    } else {
      res.status(404).json("User Password doesn't match");
    }
  }
};

const UpdateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
};

const DeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id, req.body);
};
const GetUserById = async (req, res) => {
  const data = await User.findById(req.params.id, req.body);
  res.json({ data });
};
const saveCartForUser = async (req, res) => {
  console.log(req.body);
  const cartArray = req.body;
  const data = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { userCart: cartArray } },
    { new: true }
  );
  if (data) {
    console.log(data);
    res.json(data.userCart);
  }
};

const saveWishForUser = async (req, res) => {
  console.log(req.body);
  const wishArray = req.body;
  const data = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { userWishList: wishArray } },
    { new: true }
  );
  if (data) {
    console.log(data);
    res.json(data.userCart);
  }
};
const getWishFromUser = async (req, res) => {
  const wishArray = await User.findById(req.params.id);
  console.log(wishArray);
  if (wishArray) {
    res.json(wishArray.userWishList);
  }
};
// const UploadImageToCloudinary = async (req, res) => {
//   console.log(req, req.file, req.params.id);
//   const checkifImagePathExist = await User.findById(req.params.id)
//   if(!checkifImagePathExist){

//   }
//   const checkIfImageExists = async (publicId) => {
//     try {
//       const asset = await cloudinary.api.resource(publicId);
//       return asset;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };
//   const uploadImage = async (imagePath) => {
//     // Use the uploaded file's name as the asset's public ID and
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };
//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       console.log(result);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const publicId = req.params.publicId;
//   const existingImage = await checkIfImageExists(publicId);
//   if (existingImage) {
//     console.log(existingImage);
//     const options = {
//       public_id: publicId, // Specify the public ID to overwrite the existing image
//       overwrite: true,
//     };
//     const result = await cloudinary.uploader.upload(req.file.path, options);
//     if (result) return res.status(200).json({ msg: "Image has been Changed " });
//   }
//   else {
//     const newPublicId = await uploadImage(req.file.path);
//     if (newPublicId) {
//       req.body.imagePath = publicId;

//       const createImg = await Image.create(req.body);
//       if (createImg) {
//         res.status(200).json({ msg: "Image has been added " });
//       }
//     }
//   }
// };

const updateOrUploadAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has an 'avatar' key
    if (user.avatar) {
      const options = {
        public_id: user.avatar, // Specify the public ID to overwrite the existing image
        overwrite: true,
      };
      const result = await cloudinary.uploader.upload(req.file.path, options);

      if (result) {
        return res
          .status(200)
          .json({ msg: "Avatar updated successfully", user });
      } else {
        return res.status(500).json({ error: "Failed to update avatar" });
      }
    } else {
      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path);

      if (uploadResult) {
        // Store the public ID as the user's 'avatar' key
        user.avatar = uploadResult.public_id;
        await user.save();

        return res
          .status(200)
          .json({ msg: "Avatar uploaded and linked successfully", user });
      } else {
        return res.status(500).json({ error: "Failed to upload avatar" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { updateOrUploadAvatar };

const getUserImage = async (req, res) => {
  const userInfo = await User.findById(req.params.id);
  const imagePath = path.join(
    __dirname,
    "../../uploads/avatarImage/",
    userInfo.productImage
  );

  res.sendFile(imagePath);
};
module.exports = {
  GetAllUser,
  CreateNewUser,
  UpdateUser,
  DeleteUserById,
  GetUserById,
  LoginUser,
  saveCartForUser,
  saveWishForUser,
  getWishFromUser,
  getUserImage,
  updateOrUploadAvatar,
};

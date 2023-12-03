const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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
      };
      console.log(mutateUser);
      client.messages
        .create({
          body: "Your account has just logged in ",
          from: "+13343668522",
          to: "+9779860104051",
        })
        .then((message) => console.log(message.sid));

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

module.exports = {
  GetAllUser,
  CreateNewUser,
  UpdateUser,
  DeleteUserById,
  GetUserById,
  LoginUser,
};

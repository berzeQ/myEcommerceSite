const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: String,
  online: Boolean,
  role: {
    type: String,
    enum: ["Rider", "User", "Admin", "Guest-User"],
    default: "Guest-User",
  },
  licenseDetail: String,
  userCart: Array,
  userWishList: Array,
  avatar: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;

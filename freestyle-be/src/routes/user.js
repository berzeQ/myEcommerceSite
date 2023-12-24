const express = require("express");
const User = require("../models/user");
const multer = require("multer");
const router = express.Router();
const UserController = require("../controllers/user");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatarImage/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
router.post("/register", upload.single("avatar"), UserController.CreateNewUser);

router.get("/users", UserController.GetAllUser);

// router.post("/register", UserController.CreateNewUser);
router.post("/login", UserController.LoginUser);
router.post("/saveCart/:id", upload.array(), UserController.saveCartForUser);
router.post("/saveWish/:id", upload.array(), UserController.saveWishForUser);
router.get("/wishlist/:id", UserController.getWishFromUser);

router.put("/account/:id", UserController.UpdateUser);

router.delete("/users/:id", UserController.DeleteUserById);

router.get("/users/:id", UserController.GetUserById);
router.post(
  "/account/upload-cloud/:id",
  upload.single("avatar"),
  UserController.updateOrUploadAvatar
);

module.exports = router;

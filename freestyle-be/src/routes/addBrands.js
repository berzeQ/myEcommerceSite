const express = require("express");
const Brands = require("../models/brands");
const router = express.Router();
const BrandController = require("../controllers/brands");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/brandsImage/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/brands",
  upload.single("brandImage"),
  BrandController.CreateNewBrand
);

router.get("/brands", BrandController.GetAllBrands);
router.get("/brands-image/:id", BrandController.getBrandImage);

// router.post('/login', UserController.LoginUser)

// router.put('/account/:id', UserController.UpdateUser);

// router.delete('/users/:id', UserController.DeleteUserById)

// router.get('/users/:id', UserController.GetUserById)

module.exports = router;

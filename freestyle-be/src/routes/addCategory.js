const express = require("express");
const Categories = require("../models/category");
const router = express.Router();
const CategoryController = require("../controllers/category");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categoryImage/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/add-category",
  upload.single("catImage"),
  CategoryController.CreateNewCategory
);

router.get("/add-category", CategoryController.GetAllCats);
router.get("/add-category-image/:id", CategoryController.getCatImage);

// router.post('/login', UserController.LoginUser)

// router.put('/account/:id', UserController.UpdateUser);

// router.delete('/users/:id', UserController.DeleteUserById)

// router.get('/users/:id', UserController.GetUserById)

module.exports = router;

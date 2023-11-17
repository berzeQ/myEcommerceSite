const express = require("express");
const Product = require("../models/products");
const router = express.Router();
const ProductController = require("../controllers/products");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/productsImage/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/products",
  upload.single("productImage"),
  ProductController.CreateNewProduct
);

router.get("/products", ProductController.GetAllProducts);
router.get("/products-image/:id", ProductController.getProductImage);
router.get("/products/:id", ProductController.getProductByID);
router.get("/products-search/:query", ProductController.GetSearchProducts);

// router.post('/login', UserController.LoginUser)

// router.put('/account/:id', UserController.UpdateUser);

// router.delete('/users/:id', UserController.DeleteUserById)

// router.get('/users/:id', UserController.GetUserById)

module.exports = router;

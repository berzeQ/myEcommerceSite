const express = require("express");
const Images = require("../models/Images");
const router = express.Router();
const ImageController = require("../controllers/multiImages");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/mainImage/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.post("/admin", upload.single("imagePath"), ImageController.CreateImage);

// router.get("/products", ProductController.GetAllProducts);
router.get("/admin", ImageController.getImage);
router.post(
  "/admin/upload-cloud/:publicId",
  upload.single("imagePath"),
  ImageController.UploadImageToCloudinary
);

// router.post('/login', UserController.LoginUser)

// router.put('/account/:id', UserController.UpdateUser);

// router.delete('/users/:id', UserController.DeleteUserById)

// router.get('/users/:id', UserController.GetUserById)

module.exports = router;

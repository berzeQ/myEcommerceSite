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



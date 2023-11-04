const express = require("express");
const Order = require("../models/order");
const router = express.Router();
const OrderController = require("../controllers/order");

router.post("/OrderConfirm", OrderController.CreateOrder);
router.get("/OrderConfirm", OrderController.getOrders);

module.exports = router;

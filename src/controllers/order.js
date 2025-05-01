const Order = require("../models/order");

const CreateOrder = async (req, res) => {
  try {
    if (req.body) {
      // Create the order using the Order model
      const data = await Order.create(req.body);

      // Check if data was created successfully
      if (data) {
        // Respond with a success status and a JSON message
        return res.status(201).json({ message: "Order has been made" });
      } else {
        // If data creation fails, respond with an error status and message
        return res.status(500).json({ message: "Order creation failed" });
      }
    } else {
      // If req.body is empty, respond with a bad request status and a message
      return res
        .status(400)
        .json({ message: "Bad Request: Request body is empty" });
    }
  } catch (error) {
    // Handle any unexpected errors by responding with a server error status and an error message
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getOrders = async (req, res) => {
  try {
    const data = await Order.find({ status: req.query.status });
    if (data) res.json({ orderList: data });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  CreateOrder,
  getOrders,
};

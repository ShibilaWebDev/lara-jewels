const Order = require("../models/Order");

async function createOrder(req, res) {
  try {
    console.log("BODY RECEIVED:", req.body);

    const order = await Order.create({
      customerName: req.body.customerName,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
    });

    res.status(201).json({
      isCreated: true,
      order,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);

    res.status(500).json({
      isCreated: false,
      message: error.message,
    });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find();

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
};



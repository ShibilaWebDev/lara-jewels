const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/", getOrders);
router.delete("/:id", deleteOrder);

module.exports = router;
const express = require("express");
const auth = require("../middleware/authmiddleware");

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/add", auth, addToCart);

router.get("/", auth, getCart);

router.put("/update", auth, updateCart);

router.delete(
  "/remove/:productId",
  auth,
  removeFromCart
);

module.exports = router;
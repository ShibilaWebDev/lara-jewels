const User = require("../models/User");

async function addToCart(req, res) {
  try {
    const userId = req.user.id;

    const { productId, quantity } = req.body;

   const user = await User.findById(userId);

if (!user) {
  return res.status(404).json({ message: "User not found" });
}

if (!user.cart) {
  user.cart = [];
}

const qty = Number(quantity) || 1;

const existing = user.cart.find(
  (item) => item.productId && item.productId.toString() === productId
);

    if (existing) {
      existing.quantity += Number(quantity) || 1;
    } else {
    user.cart.push({
  productId,
  quantity: qty,
});
    }

    await user.save();

    res.status(200).json({
      isAdded: true,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      isAdded: false,
      message: error.message,
    });
  }
}
//........getacrt.............
async function getCart(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .populate("cart.productId");

    // Remove broken cart items
    user.cart = user.cart.filter(
      (item) => item.productId !== null
    );

    await user.save();

    res.status(200).json({
      isGet: true,
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      isGet: false,
      message: error.message,
    });
  }
}
//.............update............
async function updateCart(req, res) {
  try {
    const userId = req.user.id;

    const { productId, quantity } = req.body;

    const user = await User.findById(userId);

    const item = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        isUpdated: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await user.save();

    res.status(200).json({
      isUpdated: true,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      isUpdated: false,
      message: error.message,
    });
  }
}
//...........delete...................
async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const user = await User.findById(userId);

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      isDeleted: true,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      isDeleted: false,
      message: error.message,
    });
  }
}
module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};
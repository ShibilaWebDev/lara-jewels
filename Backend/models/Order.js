const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    email: String,
    address: String,
    city: String,
    zip: String,
    country: String,

    products: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalAmount: Number,

    paymentMethod: String,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
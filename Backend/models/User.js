const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true, minlength: 6 },
     role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
],
  },
  { timestamps: true },
);
const User = mongoose.model("users", userSchema);
module.exports = User;

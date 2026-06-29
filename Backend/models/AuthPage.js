const mongoose = require("mongoose");

const authPageSchema = new mongoose.Schema({
  loginImages: [String],
  signupImages: [String],
});

module.exports = mongoose.model("AuthPage", authPageSchema);
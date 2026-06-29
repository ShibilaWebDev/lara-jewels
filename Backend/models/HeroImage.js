const mongoose = require("mongoose");

const heroImageSchema = new mongoose.Schema({
  image: String,
});

module.exports = mongoose.model("HeroImage", heroImageSchema);
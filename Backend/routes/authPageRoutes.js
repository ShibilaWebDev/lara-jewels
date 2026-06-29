const express = require("express");
const router = express.Router();
const AuthPage = require("../models/AuthPage");
const upload = require("../middleware/multer");

// Get login images
router.get("/login-images", async (req, res) => {
  const data = await AuthPage.findOne();
  res.json(data?.loginImages || []);
});

// Update login images
router.put("/login-images", async (req, res) => {
  const { images } = req.body;

  let data = await AuthPage.findOne();

  if (!data) {
    data = new AuthPage({
      loginImages: images,
      signupImages: [],
    });
  } else {
    data.loginImages = images;
  }

  await data.save();
  res.json({ success: true });
});

// Get signup images
router.get("/signup-images", async (req, res) => {
  const data = await AuthPage.findOne();
  res.json(data?.signupImages || []);
});

// Update signup images
router.put("/signup-images", async (req, res) => {
  const { images } = req.body;

  let data = await AuthPage.findOne();

  if (!data) {
    data = new AuthPage({
      loginImages: [],
      signupImages: images,
    });
  } else {
    data.signupImages = images;
  }

  await data.save();
  res.json({ success: true });
});
router.post(
  "/upload",
  upload.array("images", 10),
  async (req, res) => {
    try {
      const imageUrls = req.files.map(
        (file) =>
          `http://localhost:3000/uploads/${file.filename}`
      );

      res.json(imageUrls);
    } catch (error) {
      res.status(500).json({
        message: "Upload Failed",
      });
    }
  }
);
module.exports = router;
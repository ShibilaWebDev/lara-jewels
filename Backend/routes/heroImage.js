const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer"); // your multer file
const HeroImage = require("../Models/HeroImage");

router.post(
  "/upload",
  upload.single("heroImage"),
  async (req, res) => {
    try {
      const imagePath = `/uploads/${req.file.filename}`;

      let hero = await HeroImage.findOne();

      if (!hero) {
        hero = await HeroImage.create({
          image: imagePath,
        });
      } else {
        hero.image = imagePath;
        await hero.save();
      }

      res.status(200).json({
        success: true,
        image: imagePath,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const hero = await HeroImage.findOne();

    res.json(hero || {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
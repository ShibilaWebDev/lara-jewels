// const express= require("express")
// const upload = require("../middleware/multer");
// const router = express.Router()
// const {adminAuth} =require("../middleware/adminAuth")
// const productController= require("../controllers/productController")

// router.post("/addproduct",adminAuth,upload.single("image"),productController.addProduct)
// router.post("/getProducts",adminAuth,productController.getProducts)
// router.delete("/deleteProduct/:id",adminAuth,productController.deleteProduct)
// module.exports=router
const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();

const { adminAuth } = require("../middleware/adminAuth");

const productController = require("../controllers/productController");

router.post(
  "/addproduct",
  adminAuth,
  upload.single("image"),
  productController.addProduct
);

router.post(
  "/getProducts",
  adminAuth,
  productController.getProducts
);

router.delete(
  "/deleteProduct/:id",
  adminAuth,
  productController.deleteProduct
);
router.get(
  "/dashboard",
  adminAuth,
  productController.getDashboard
);

// NEW ROUTE
router.put(
  "/updateproduct/:id",
  adminAuth,
  upload.single("image"),
  productController.updateProduct
);

module.exports = router;
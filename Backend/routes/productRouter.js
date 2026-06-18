const express= require("express")

const productController= require("../controllers/productController")
const router = express.Router()
router.get("/product/:id",productController.getProduct)
router.get("/getProducts",productController.getProducts)

module.exports= router
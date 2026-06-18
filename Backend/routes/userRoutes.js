const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")
const auth = require("../middleware/authmiddleware")

router.get("/",userController.getUser)
router.post("/register",userController.register)
router.post("/login",userController.login)
router.post("/adminLogin",userController.adminLogin)
router.get("/isLogin",auth,userController.isLogin)
router.post("/logout", userController.logout);
router.get("/users", userController.getAllUsers);
router.delete("/delete/:id", userController.deleteUser);

module.exports= router
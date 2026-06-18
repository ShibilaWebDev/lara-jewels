const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { now } = require("mongoose");
async function getUser(req, res) {
  res.send("user fetched");
}
async function register(req, res) {
  try {
    const user = req.body;
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
    const isEmail = await User.findOne({ email: user.email });
    if (isEmail) {
      return res
        .status(400)
        .json({
          message: "Email already exist",
          isRegistered: false,
          isEmail: true,
        });
    }
    await User.create(user); //create mean push the 'users data document to the collection of db
    res
      .status(201)
      .json({ message: "user registered", isRegistered: true, isEmail: false });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: err.message, isRegistered: false, isEmail: false });
  }
}

//login

async function login(req, res) {
  try {
    const user = req.body;
    const isEmail = await User.findOne({ email: user.email });
    if (!isEmail) {
      return res
        .status(404)
        .json({ message: "this user account is not found", isLogin: false })
}
    //verify password
     
    const verify= await bcrypt.compare(user.password,isEmail.password)
    console.log(verify,user.password,isEmail.password);
    
    if(!verify){
       return res
        .status(404)
        .json({ message: "password incorrect", isLogin: false })
    }


    //generate Token

    const token = jwt.sign({id:isEmail._id, email: user.email,role:isEmail.role }, process.env.SECRET_KEY,{expiresIn:"7d"})
    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax",expires:new  Date(Date.now()+6*24*60*60*1000)})
      .status(200)
      .json({ message: "token created", isLogin: true, token })
  } catch (err) {
    res.status(500).json({ message: "internal server error", isLogin: false });
    console.log(err.message);
  }
}


//admin login

async function adminLogin(req, res) {
  try {
    const user = req.body;
    const isEmail = await User.findOne({ email: user.email });
    if (!isEmail) {
      return res
        .status(404)
        .json({ message: "this user account is not found", isLogin: false })
}
    //verify password
    if(isEmail.role!=="admin"){

      return res
        .status(400)
        .json({ message: "you are not an admin", isLogin: false })
    }
     
    const verify= await bcrypt.compare(user.password,isEmail.password)
    console.log(verify,user.password,isEmail.password);
    
    if(!verify){
       return res
        .status(404)
        .json({ message: "password incorrect", isLogin: false })
    }


    //generate Token

    const token = jwt.sign({   id: isEmail._id,email: user.email,role:isEmail.role }, process.env.SECRET_KEY,{expiresIn:"120h"})
    res
      .cookie("adminToken", token, { httpOnly: true, sameSite: "lax",expires:new  Date(Date.now()+7*24*60*60*1000)})
      .status(200)
      .json({ message: "token created", isLogin: true, token })
  } catch (err) {
    res.status(500).json({ message: "internal server error", isLogin: false });
    console.log(err.message);
  }
}

async function isLogin(req,res) {
    try {
      if(req.isUser){
        return res.status(200).json({message:"it is a logged user",isLogin:true})
      }else{
         

        throw new Error("user not logged in  ")
      }
      
    } catch (error) {
      return res.status(500).json({message:error.message,isLogin:false})
      
    }

  
}
//..........logout.....
async function logout(req, res) {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout successful",
      isLogin: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      isLogin: false,
    });
  }
}
//..............getAllUser...........
async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//............deleteUsers..........
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
 module.exports = {
  getUser,
  register,
  login,
  adminLogin,
  isLogin,
  logout,
  getAllUsers,
  deleteUser,
};
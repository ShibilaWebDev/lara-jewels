const bcrypt = require("bcrypt");
const User = require("./models/User");
const prompt = require("prompt-sync")();
const { connection } = require("./config/db"); //const mongoose = require("mongoose");
                                                //mongoose.connect("mongodb://127.0.0.1:27017/");
connection();
async function seedAdmin() {
  try {
    const  adminName=prompt("Enter your name : ")
    const adminEmail=prompt("Enter your email : ")
    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }
    const password = prompt("Enter password : ")
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    if(error.response){
       console.log(error.response.data);
       
    }
    console.log(error);
    console.log(error.message);
    process.exit();
  }
}

seedAdmin();
console.log("hello");


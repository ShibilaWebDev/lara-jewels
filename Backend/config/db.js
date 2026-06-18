const mongoose=require("mongoose")
function connection(){
  mongoose.connect("mongodb://localhost:27017/LARA")
.then(()=>console.log("database connected"))
.catch((err=>console.log(err)))
}
module.exports={connection}
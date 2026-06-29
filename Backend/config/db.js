const mongoose=require("mongoose")
function connection(){
  mongoose.connect(process.env.DB_API)
.then(()=>console.log("database connected"))
.catch((err=>console.log(err)))
}
module.exports={connection}
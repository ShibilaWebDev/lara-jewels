const express =require("express")
const path = require("path");
const userRoutes=require("./routes/userRoutes")
const adminRoutes=require("./routes/adminRoutes")
const productRouter=require("./routes/productRouter")
const cookieParser =require("cookie-parser")
require("dotenv").config()
const PORT=process.env.PORT
const app = express()
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRouter");


const cors=require("cors")
app.use(cors({origin:'http://localhost:5173',credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use("/uploads",express.static(path.join(__dirname, "uploads")  ))

const{connection}=require("./config/db")   //this call from config-db.js
connection()

app.use("/users",userRoutes)
app.use("/admin",adminRoutes)
app.use("/products",productRouter)
app.use("/cart", cartRoutes)
app.use("/orders", orderRoutes);

app.post("/test", (req, res) => {
  
  res.send("working");
});


app.listen(PORT,()=>{
  console.log(`server running on http://localhost:${PORT}`)
  
})
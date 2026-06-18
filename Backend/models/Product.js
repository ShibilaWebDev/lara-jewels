const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxLength: 150 },
  category: {
    type: String,
    required: true,
    trim: true,
    maxLength: 150,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type:Number,
    required:true,
    min:0,
    default:0
  },
  offer:{
    type:Number,
    default:0,
    min:0,
    max:100
  },description: {
  type: String,
  trim: true,
  maxLength: 1000,
},

  status:{
    type:String,
    enum:["available","featured","outofstock"],
    default:"available"
  },
  imageUrl:[
 {  
   type:String
   } 
  ]
},
{
  timestamps:true
}
);

const Product = mongoose.model("products", productSchema);
module.exports = Product;


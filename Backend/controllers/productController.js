const Product = require("../models/Product");
const User = require("../models/User");

async function addProduct(req, res) {
  try {
    if (req.admin.role !== "admin") {
      return res
        .status(403)
        .json({ message: "you are  an admin", isAdded: false });
    }

    const {
      name,
      category,
      price,
      stock,
      offer,
      description,
      status,
      imageUrl,
    } = req.body;

    let finalImage = "";

    // IF FILE UPLOADED
    if (req.file) {
      finalImage = `/uploads/${req.file.filename}`;
    }

    // IF URL IMAGE
    else if (imageUrl) {
      finalImage = imageUrl;
    }

    const result = await Product.create({
      name,
      category,
      price,
      stock,
      offer,
      description,
      status,
      imageUrl: [finalImage],
    });

    return res.status(201).json({
      message: "Product added",
      isAdded: true,
      result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
      isAdded: false,
    });
  }
}

async function getProducts(req, res) {
  try {
   
    
    const products = await Product.find();
    res.status(200).json({ message: "product fetched", isGet: true,products });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
      isGet: false,
    });
  }
}
async function deleteProduct(req,res){
  try {
     if (req.admin.role !== "admin") {
      return res
        .status(403)
        .json({ message: "you are  an admin", isDelete: false });
    }
    const productId=req.params.id
  if(!productId){
    return res
        .status(400)
        .json({ message: "id is not received", isDelete: false });
        

  }
  const dltData =await Product.findByIdAndDelete(productId)
  if(dltData){
    return res.status(200).json({
      message:"product deleted",isDelete:true,dltData
    })
  } else{
    throw new Error("server thrown error")
  }
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
      isDelete: false,
    });
  }
}

async function getProduct(req,res){
    try {
      const id=req.params.id
    const result=await Product.findById(id)
    if(!result){
      return res.status(404).json({message:"product not found",isFound:false})
    }
    res.status(200).json({message:"product fetched",isFound:true,result})
    } catch (error) {
      console.log(error);

    return res.status(500).json({
      message: error.message,
      isFound: false,
    });
    }

}
// ........nj........
async function updateProduct(req, res) {
  try {
    if (req.admin.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can update product",
        isUpdated: false,
      });
    }

    const productId = req.params.id;

    const {
      name,
      category,
      price,
      stock,
      offer,
      description,
    } = req.body;

    const updateData = {
      name,
      category,
      price,
      stock,
      offer,
      description,
    };

    // NEW IMAGE UPLOAD
    if (req.file) {
      updateData.imageUrl = [
        `/uploads/${req.file.filename}`
      ];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        isUpdated: false,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      isUpdated: true,
      updatedProduct,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
      isUpdated: false,
    });
  }
}
//........................get dashboard........
async function getDashboard(req, res) {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  getDashboard,
};

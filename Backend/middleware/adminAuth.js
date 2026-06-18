const jwt = require("jsonwebtoken");

async function adminAuth(req, res, next) {
  const token = req.cookies.adminToken;
  jwt.verify(token,process.env.SECRET_KEY,(err,data)=>{
    if(err){
    return  res.status(403).json({message:"invalid token,access denied",isAuth:false,isAdmin:false})
      
    }
    if(!data.role=="admin"){
    return  res.status(403).json({message:"you are not a admin",isAuth:false,isAdmin:false})
      
    }
    req.admin= data
    next()
  })
  
}
  
module.exports = { adminAuth };

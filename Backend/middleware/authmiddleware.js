const JWT =require("jsonwebtoken")

function auth(req,res,next){

  try {
    
  const Token = req.cookies.token
  const verify= JWT.verify(Token,process.env.SECRET_KEY,(err,data)=>{

  if(err){
    return res.status(401).json({message:"login error",isAuth:false})
  }if(data){
    req.isUser=true
    req.user=data
    
  }
     next()
  })

  } catch (error) {
    return res.status(500).json({message:error.message,isAuth:false})
    
  }
  
}

module.exports=auth
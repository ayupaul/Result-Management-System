const jwt=require('jsonwebtoken');
require('dotenv').config();
const auth=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.redirect('/teacher/login');
    }
 const jwtVerify=jwt.verify(token,process.env.SECRET_TOKEN);
 if(!jwtVerify){
    return res.redirect('/teacher/login');
 }
 next();
}
module.exports=auth;
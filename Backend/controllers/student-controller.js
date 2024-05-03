const asyncHandler=require('express-async-handler');
const student=require('../models/student-model');
//verify student
const verifyStudent=asyncHandler(async(req,res)=>{
    const {rollNumber,dob}=req.body;
    console.log(rollNumber);
    console.log(dob);
    if(!rollNumber || !dob){
        res.render("loginStudent",{layout:false});
    }
    const studentResult=await student.findOne({rollNumber,dob});
    if(!studentResult){
        res.render("studentResult",{Message:"Result Not Found",layout:false});
    }
    else{
        res.render("studentResult",{studentResult:studentResult,layout:false});
    }
})
module.exports={verifyStudent};
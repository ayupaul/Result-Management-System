const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode;
    switch(statusCode){
        case 400:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
              });
              break;
        case 500:
            res.json({
                title:"Internal server error",
                message:err.message,
                stackTrace:err.stackTrace
            });
            break;
        default:
            console.log("no error");
    }
    next();
}
module.exports=errorHandler;
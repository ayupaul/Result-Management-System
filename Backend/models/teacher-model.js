const mongoose=require('mongoose');
const teacherSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is a required field"]
    },
    email:{
        type:String,
        required:[true,"email is a required field"]
    },
    password:{
        type:String,
        required:[true,"password is a required field"]
    }
});
module.exports=mongoose.model("teacher",teacherSchema);
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const teacher = require("../models/teacher-model");
const student = require("../models/student-model");
//send welcome message
const welcome = (req, res) => {
  res.send("Welcome");
};
//register teacher
const registerTeacher = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    console.log(name);
    const teacherSame=await teacher.findOne({email});
    console.log(teacherSame);
    // const sameEmail=await teacher.find({email:email});
    if (!name || !email || !password) {
      req.session.message={
        message:"Validation error",
        type:"danger"
      }
      res.redirect("/teacher/register")
    }
  
    if(teacherSame){
 
      // res.json({Message:"Email already exists", type:"danger"});
      req.session.message={
        message:"Email already exists",
        type:"danger"
      }
      res.redirect("/teacher/register")
    }
    else{
    await teacher.create({
      name,
      email,
      password,
    });
    // res.json({ Message: "Registered Successfully" });
    req.session.message = {
      message: "Registered Successfully...",
      type: "success",
    };
    res.redirect("/");
  }

});
//login teacher
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;
  const user = await teacher.findOne({ email, password });
  if (!user) {
    req.session.message={
      message:"User not found",
      type:"danger"
    }
    res.redirect("/teacher/login")
  } else {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "30m" }
    );
    req.session.message = {
      message: "Login Successful...",
      type: "success",
    };
    res.cookie("token", accessToken, { maxAge: 30 * 60 * 1000 });
    res.redirect("/");
  }
};

//add student

const addStudent = asyncHandler(async (req, res) => {
  const { rollNumber, dob, name, score } = req.body;
  // console.log(rollNumber);
  // console.log(dob);
  if (!rollNumber || !dob || !name || !score) {
    // res.status(400).json({Message:"Validation failed"});
    req.session.message={
      message:"Validation failed",
      type:"danger"
    }
    res.redirect("/teacher/addStudent")
  }
  const sameStudent = await student.findOne({ rollNumber });
  if (sameStudent) {
    req.session.message={
      message:"Student already exists",
      type:"danger"
    }
    res.redirect("/teacher/addStudent")
  }
  await student.create({
    rollNumber,
    dob,
    name,
    score,
  });
  req.session.message = {
    message: "Student added successfully",
    type: "success",
  };
  res.redirect("/");
});
//get all students
const listOfStudents = asyncHandler(async (req, res) => {
  const students = await student.find();
  // console.log(students);
  if (!students) {
    req.session.message={
      message:"No student found",
      type:"danger"
    }
    res.redirect("/")
  }
  res.render("layout", { students: students});
});
//get student by id
const getStudentById=asyncHandler(async(req,res)=>{
 
  const _id=req.params.id;
  const std=await student.findOne({_id});
  if(!std){
    req.session.message={
      message:"Student not found",
      type:"danger"
    }
    res.redirect("/")
  }
  res.render("editStudent",{student:std,layout:false});
});
//edit student
const editStudent=asyncHandler(async(req,res)=>{
  const {name,rollNumber,dob,score}=req.body;
  const _id=req.params.id;
  const updatedStudent=await student.findByIdAndUpdate(_id,{
    name:name,
    rollNumber:rollNumber,
    dob:dob,
    score:score
  },
  );
  if(updatedStudent){
    req.session.message={
      message:"Updated Successfully...",
      type:"success"
    }
    res.redirect("/");
  }
  else{
    res.render("editStudent",{Message:"Student not found",layout:false});
  }
})

//delete student
const deleteStudent=asyncHandler(async(req,res)=>{
  const _id=req.params.id;
  const deletedStudent=await student.findByIdAndRemove(_id);
  if(!deletedStudent){
    res.render("layout");
  }
  else{
    req.session.message={
      message:"Deleted Successfully...",
      type:"success"
    }
    res.redirect("/");
  }
})
module.exports = {
  welcome,
  registerTeacher,
  loginTeacher,
  addStudent,
  listOfStudents,
  getStudentById,
  editStudent,
  deleteStudent
};

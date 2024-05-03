const express = require("express");
const studentRoute=express.Router();
const {verifyStudent}=require('../controllers/student-controller');
// verify student details
studentRoute.route("/login").get((req, res) => {
  res.render("loginStudent", { layout: false });
});
studentRoute.route("/login").post((req,res)=>{
    verifyStudent(req,res);
})
module.exports = studentRoute;

const express = require("express");
const {

  registerTeacher,
  loginTeacher,
  addStudent,
  listOfStudents,
  getStudentById,
  editStudent,
  deleteStudent,
} = require("../controllers/teacher-controller");
const auth = require("../middleware/auth");
const router = express.Router();


//register teacher
router.route("/register").get((req, res) => {
  res.render("registerTeacher", { title: "Register", layout: false });
});
router.route("/register").post((req, res) => {
  registerTeacher(req, res);
});

// login teacher
router.route("/login").get((req, res) => {
  res.render("loginTeacher", { Title: "Login Teacher", layout: false });
});
router.route("/login").post((req, res) => {
  loginTeacher(req, res);
});

//add students details
router.route("/addStudent").get(auth,(req, res) => {
  res.render("addStudent", { Title: "Add Students", layout: false });
});
router.route("/addStudent").post((req, res) => {
  addStudent(req, res);
});

//get student by id
router.route("/editStudent/:id").get(auth, (req, res) => {
  getStudentById(req, res);
});

//edit student
router.route("/editStudent/:id").post(auth, (req, res) => {
  editStudent(req, res);
});

//delete student
router.route("/deleteStudent/:id").get(auth, (req, res) => {
  deleteStudent(req, res);
});

//logout
router.route("/logout").get(auth, (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});
module.exports = router;

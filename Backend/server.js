const express = require("express");
const router = require("./routes/teacher-route");
const studentRoute = require("./routes/student-route");
const app = express();
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const dbConnect = require("./config/db.config");
const auth = require("./middleware/auth");
require("dotenv").config();
const cookie = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const { listOfStudents } = require("./controllers/teacher-controller");
const PORT = process.env.PORT;
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use("/public/js", express.static(path.join(__dirname, "public/js")));
app.use("/public/css", express.static(path.join(__dirname, "public/css")));
app.use("/public/images",express.static(path.join(__dirname,"public/images")));
const viewPath = path.join(__dirname, "template/views");
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(path.join(__dirname, "template/partials"));
app.get("/", (req, res) => {
  listOfStudents(req, res);
  // res.render("layout");
  // console.log("hello");
  // res.send("hi");
});
// app.get('/teacher/listOfStudent',auth,(req,res)=>{
//   res.render('listOfStudents',{layout:false});
// })

//get all students
//get all student details

app.use("/teacher", router);
app.use("/student", studentRoute);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

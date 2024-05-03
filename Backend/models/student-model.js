const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  rollNumber: {
    type: Number,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
});
module.exports = mongoose.model("student", studentSchema);

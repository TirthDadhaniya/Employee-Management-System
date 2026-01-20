const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    e_name: {
      type: String,
      required: true,
      trim: true,
    },
    e_mail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    e_phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    e_gender: {
      type: String,
      required: true,
      trim: true,
    },
    e_designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },
    e_dateOfJoining: {
      type: Date,
      required: true,
    },
    e_initialSalary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);

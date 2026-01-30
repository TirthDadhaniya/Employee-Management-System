const mongoose = require("mongoose");

const salaryEntrySchema = new mongoose.Schema(
  {
    e_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: {
      type: String,
      required: true,
      enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
    year: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

salaryEntrySchema.index({ e_id: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("SalaryEntry", salaryEntrySchema);

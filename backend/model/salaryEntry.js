const mongoose = require("mongoose");

const salaryEntrySchema = new mongoose.Schema(
  {
    e_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
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

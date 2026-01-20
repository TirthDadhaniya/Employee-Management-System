const SalaryEntry = require("../model/salaryEntry");

// CREATE salary entry
exports.createSalaryEntry = async (req, res) => {
  try {
    const salaryEntry = await SalaryEntry.create(req.body);
    res.status(201).json({
      success: true,
      data: salaryEntry,
    });
  } catch (error) {
    // Duplicate error handling (month+year+employee)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Salary entry already exists for this employee for this month and year",
      });
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET all salary entries
exports.getAllSalaryEntries = async (req, res) => {
  try {
    let query = {};
    if (req.query.e_id) {
      query.e_id = req.query.e_id;
    }

    // Logic for date range (Month/Year)
    const fromMonth = parseInt(req.query.from_month);
    const fromYear = parseInt(req.query.from_year);
    const toMonth = parseInt(req.query.to_month);
    const toYear = parseInt(req.query.to_year);

    let dateConditions = [];

    // Filter: From (Month/Year) -> Onwards
    if (fromMonth && fromYear) {
      dateConditions.push({
        $or: [
          { year: { $gt: fromYear } },
          { year: fromYear, month: { $gte: fromMonth } },
        ],
      });
    }

    // Filter: To (Month/Year) -> Up to
    if (toMonth && toYear) {
      dateConditions.push({
        $or: [
          { year: { $lt: toYear } },
          { year: toYear, month: { $lte: toMonth } },
        ],
      });
    }

    if (dateConditions.length > 0) {
      query.$and = dateConditions;
    }

    const salaryEntries = await SalaryEntry.find(query).populate("e_id", "e_name e_designation");
    res.status(200).json({
      success: true,
      data: salaryEntries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET salary entry by ID
exports.getSalaryEntryById = async (req, res) => {
  try {
    const salaryEntry = await SalaryEntry.findById(req.params.id).populate("e_id", "e_name e_designation");

    if (!salaryEntry) {
      return res.status(404).json({
        success: false,
        message: "Salary entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: salaryEntry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE salary entry
exports.updateSalaryEntry = async (req, res) => {
  try {
    const salaryEntry = await SalaryEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!salaryEntry) {
      return res.status(404).json({
        success: false,
        message: "Salary entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: salaryEntry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE salary entry
exports.deleteSalaryEntry = async (req, res) => {
  try {
    const salaryEntry = await SalaryEntry.findByIdAndDelete(req.params.id);

    if (!salaryEntry) {
      return res.status(404).json({
        success: false,
        message: "Salary entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Salary entry deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

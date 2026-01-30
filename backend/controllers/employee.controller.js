const Employee = require("../model/employee");

// Add Employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      status: "success",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("e_designation");
    res.status(200).json({
      status: "success",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("e_designation");
    if (!employee) {
      return res.status(404).json({
        status: "fail",
        error: "Employee not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Update Employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!employee) {
      return res.status(404).json({
        status: "fail",
        error: "Employee not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Delete Employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        status: "fail",
        error: "Employee not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

// Employee Dropdown
exports.getEmployeeDropdown = async (req, res) => {
  try {
    const employees = await Employee.find().select("_id e_name");
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Employee Designation
exports.getDesignationsDropdown = async (req, res) => {
  try {
    const designations = await Employee.distinct("e_designation");
    res.status(200).json({
      success: true,
      data: designations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Designation = require("../model/designation");

// Add Designation
exports.createDesignation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Designation name is visible" });
    }
    const existing = await Designation.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Designation already exists" });
    }
    const newDesignation = new Designation({ name });
    await newDesignation.save();
    res.status(201).json({ message: "Designation added successfully", data: newDesignation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Designations
exports.getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find().sort({ createdAt: -1 });
    res.status(200).json({ data: designations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Designation
exports.deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Designation.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.status(200).json({ message: "Designation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

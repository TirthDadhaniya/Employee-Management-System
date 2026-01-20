const express = require("express");
const router = express.Router();
const salaryEntryController = require("../controllers/salaryEntry.controller");

router.post("/", salaryEntryController.createSalaryEntry);
router.get("/", salaryEntryController.getAllSalaryEntries);
router.get("/:id", salaryEntryController.getSalaryEntryById);
router.put("/:id", salaryEntryController.updateSalaryEntry);
router.delete("/:id", salaryEntryController.deleteSalaryEntry);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/designation.controller");

router.post("/", controller.createDesignation);
router.get("/", controller.getAllDesignations);
router.delete("/:id", controller.deleteDesignation);

module.exports = router;

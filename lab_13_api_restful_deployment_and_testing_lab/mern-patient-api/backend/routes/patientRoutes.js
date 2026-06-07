const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/patientController");

/* CREATE - Admin only */
router.post("/", auth("admin"), controller.createPatient);

/* GET ALL - Any authenticated user */
router.get("/", auth(), controller.getPatients);

/* GET ONE - Any authenticated user */
router.get("/:id", auth(), controller.getPatient);

/* UPDATE - Admin only */
router.put("/:id", auth("admin"), controller.updatePatient);

/* DELETE - Admin only */
router.delete("/:id", auth("admin"), controller.deletePatient);

module.exports = router;

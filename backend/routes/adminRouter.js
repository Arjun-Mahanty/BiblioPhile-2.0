const express = require("express");
const adminController = require("../controllers/adminController")

const router = express.Router();

router.post("/add",adminController.add);
router.delete("/delete",adminController.delete);
router.patch("/update",adminController.update)

module.exports = router;
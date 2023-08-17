const express = require("express");
const libController = require('../controllers/libController')

const router = express.Router();

router.get("/getAll",libController.getAll);
router.get("/getByName/:name",libController.getByName)
router.post("/add")
router.delete("/delete/:id")
router.patch("/update/:id")

module.exports = router;

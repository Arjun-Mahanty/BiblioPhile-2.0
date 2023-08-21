const express = require("express");
const libController = require('../controllers/libController')

const router = express.Router();

router.get("/getAll",libController.getAll);
router.get("/getByName/:name",libController.getByName);
router.get("/getDetails",libController.getDetails);

module.exports = router;

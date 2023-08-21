const express = require("express");
const GPTController = require("../controllers/gptController");

const router = express.Router();

router.post("/q",GPTController.handleGPTQurery);
router.post("/init",GPTController.init);

module.exports = router;

const express = require("express");
const router = express.Router();
const playerController = require("./controller");

router.post("/create", playerController.createPlayer);

module.exports = router;

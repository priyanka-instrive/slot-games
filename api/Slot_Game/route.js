const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const schema = require("./schema.js");

const controller = require("./controller.js");

router.post(
  "/spin",
  celebrate(schema.spinSchema, schema.options),
  controller.spinReels
);

module.exports = router;

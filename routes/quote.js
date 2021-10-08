"use strict";
const express = require("express");
const router = express.Router();
const {
      addQuote,
      getQuotes
} = require("../controller/quote.controller");

router.post("/", addQuote);
router.get("/", getQuotes)

module.exports = router;
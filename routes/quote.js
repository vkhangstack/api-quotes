"use strict";
const express = require("express");
const router = express.Router();

const {
  addQuote,
  getQuotes,
  getQuoteQuery,
} = require("../controller/quote.controller");
router.post("/", addQuote);
router.get("/", getQuotes);
router.get("/query", getQuoteQuery);

module.exports = router;

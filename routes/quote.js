"use strict";
const express = require("express");
const router = express.Router();

const {
  addQuote,
  getQuotes,
  getQuoteQuery,
} = require("../controller/quote.controller");
router.post("/quotes", addQuote);
router.get("/quotes", getQuotes);
router.get("/query", getQuoteQuery);

module.exports = router;

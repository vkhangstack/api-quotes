"use strict";
const express = require("express");
const router = express.Router();

const {
  addQuote,
  getQuotes,
  getQuoteQuery,
  deleteQuote,
} = require("../controller/quote.controller");
router.post("/quotes", addQuote);
router.get("/quotes", getQuotes);
router.get("/query", getQuoteQuery);
router.delete("/quote/:id", deleteQuote);

module.exports = router;

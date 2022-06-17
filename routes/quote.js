"use strict";
const express = require("express");
const router = express.Router();

const {
  addQuote,
  getQuotes,
  getQuoteQuery,
  addPage,
  pushJson,
} = require("../controller/quote.controller");
router.post("/quotes", addQuote);
router.get("/quotes", getQuotes);
router.get("/query", getQuoteQuery);
router.get("/add", addPage);
router.post("/jsonfile", pushJson);

module.exports = router;

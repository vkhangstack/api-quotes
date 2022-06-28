"use strict";
const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");
// const upload = multer({ dest: "upload/" });

const {
  addQuote,
  getQuotes,
  getQuoteQuery,
  addPage,
  pushJson,
  addJson,
} = require("../controller/quote.controller");
router.post("/quotes", addQuote);
router.get("/quotes", getQuotes);
router.get("/query", getQuoteQuery);
router.get("/add", addPage);
router.post("/jsonfile", upload.any(), pushJson);
router.post("/addJson", addJson);

module.exports = router;

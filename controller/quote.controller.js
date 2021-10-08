"use strict";

const NotFound = require("../utils/handleNotFound");
const BadRequest = require("../utils/handleBadRequest");
const QuotesModel = require("../models/quotes.model");

const addQuote = async (req, res) => {
  try {
    let body = req.body;
    if (!body) return res.send(NotFound());
    const quotes = await new QuotesModel(body).save();
    if (!body) return res.send(NotFound());
    return res.status(200).send(quotes);
  } catch (error) {
    return BadRequest();
  }
};

const getQuotes = async (res) => {
  try {
    const quotes = await QuotesModel.find();

    return res.status(200).send(quotes)
  } catch (error) {
    return BadRequest();
  }
};

module.exports = {
  addQuote,
  getQuotes
};
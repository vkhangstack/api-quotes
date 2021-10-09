"use strict";

const NotFound = require("../utils/handleNotFound");
const BadRequest = require("../utils/handleBadRequest");
const QuotesModel = require("../models/quotes.model");
/**
 * Add single quote to database.
 * * Important is from data
 * ! If body null return not found
 * ? This is method exposed in the public API
 */
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

/**@function
 * get all from list quotes
 */
const getQuotes = async (_req, res) => {
  try {
    const quotes = await QuotesModel.find();
    return res.status(200).send(quotes);
  } catch (error) {
    return BadRequest();
  }
};

/**
 * Get single quote with query
 * example: ?q=random&min=50&max=100
 */
const getQuoteQuery = (req, res) => {
  try {
    let { random, min, max } = req.query;
    console.log(min);
  } catch (error) {
    return BadRequest();
  }
};

module.exports = {
  addQuote,
  getQuotes,
  getQuoteQuery,
};

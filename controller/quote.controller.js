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
    // Check data already exist
    const check = await QuotesModel.findOne({ quote: body.quote });
    if (check) return res.send(NotFound());

    const quotes = await new QuotesModel({
      quote: body.quote,
      author: body.author,
      tags: body.tags,
      length: body.quote.length,
    }).save();

    if (!quotes) return res.send(NotFound());

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
 * example: ?quote=random&min=50&max=100
 */
const getQuoteQuery = async (req, res) => {
  try {
    let { quote, min, max } = req.query;

    if (quote === "random" && min && max) {
      const quotes = await QuotesModel.find({
        length: { $lte: max, $gte: min },
      });
      const data = quotes[Math.floor(Math.random() * quotes.length)];
      return res.send(data);
    }
    if (quote === "random" && min) {
      const quotes = await QuotesModel.find({ length: { $gte: min } });
      const data = quotes[Math.floor(Math.random() * quotes.length)];
      return res.send(data);
    }
    if (quote === "random" && max) {
      const quotes = await QuotesModel.find({ length: { $lte: max } });
      const data = quotes[Math.floor(Math.random() * quotes.length)];
      return res.send(data);
    }
    if (quote === "random") {
      const quotes = await QuotesModel.find();
      const data = quotes[Math.floor(Math.random() * quotes.length)];
      return res.status(200).send(data);
    }
    if (max && min) {
      const data = await QuotesModel.find({ length: { $lte: max, $gte: min } });
      return res.send(data);
    }
    if (min) {
      const data = await QuotesModel.find({ length: { $gte: min } });
      return res.send(data);
    }
    if (max) {
      const data = await QuotesModel.find({ length: { $lte: max } });
      return res.send(data);
    }
  } catch (error) {
    return BadRequest();
  }
};

module.exports = {
  addQuote,
  getQuotes,
  getQuoteQuery,
};
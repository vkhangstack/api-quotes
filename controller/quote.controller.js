"use strict";

const NotFound = require("../utils/handleNotFound");
const BadRequest = require("../utils/handleBadRequest");
const QuotesModel = require("../models/quotes.model");
const NotAccept = require("../utils/handleNotAccept");
const Random = require("../utils/random");

/**
 * Add single quote to database.
 */
const addQuote = async (req, res) => {
  try {
    let body = req.body;
    if (!body) return res.send(NotFound());
    // Check data already exist
    const check = await QuotesModel.find({
      quote: { $eq: body.quote.toString() },
    });
    if (check[0])
      return res.send({
        status: 200,
        message: "Quote already exists",
      });

    const quotes = await new QuotesModel({
      quote: body.quote,
      author: body.author || "Unknown",
      tags: body.tags,
      length: body.quote.length || "Unknown",
      language: body.language || "Unknown",
    }).save();

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
    min = parseInt(min);
    max = parseInt(max);
    if (min >= max) return res.status(404).send(NotAccept());

    if (min && isNaN(min)) {
      return res.status(400).send({
        status: 404,
        message: "Invalid query min/max",
      });
    }
    if (max && isNaN(max)) {
      return res.status(400).send({
        status: 404,
        message: "Invalid query min/max",
      });
    }
    if (quote === "random" && min && max) {
      const quotes = await QuotesModel.find({
        length: {
          $lte: max,
          $gte: min,
        },
      });
      const data = quotes[Math.floor(Random() * quotes.length)];
      return res.send(data);
    }
    if (quote === "random" && min) {
      const quotes = await QuotesModel.find({
        length: {
          $gte: min,
        },
      });
      const data = quotes[Math.floor(Random() * quotes.length)];
      return res.send(data);
    }
    if (quote === "random" && max) {
      const quotes = await QuotesModel.find({
        length: {
          $lte: max,
        },
      });
      const data = quotes[Math.floor(Random() * quotes.length)];
      return res.send(data);
    }
    if (quote === "random") {
      const quotes = await QuotesModel.find();
      const data = quotes[Math.floor(Random() * quotes.length)];
      return res.status(200).send(data);
    }
    if (max && min) {
      const data = await QuotesModel.find({
        length: {
          $lte: max,
          $gte: min,
        },
      });
      return res.send(data);
    }
    if (min) {
      const data = await QuotesModel.find({
        length: {
          $gte: min,
        },
      });
      return res.send(data);
    }
    if (max) {
      const data = await QuotesModel.find({
        length: {
          $lte: max,
        },
      });
      return res.send(data);
    }
  } catch (error) {
    return BadRequest();
  }
};

/**
 * Delete single quote
 * Example: http://localhost:3000/api/quote/?id=62b8b8d68332497f6ea384bf
 */
const deleteQuote = async (req, res) => {
  try {
    const data = await QuotesModel.deleteOne({ _id: req.params.id });

    if (!data) {
      return res.status(200).send({
        error: {
          status: 200,
          message: "Id not found",
        },
      });
    } else {
      return res.send({
        success: {
          status: 200,
          data: data,
          message: "Delete quotes successful",
        },
      });
    }
  } catch (error) {
    return res.status(403).send(error.message);
  }
};

module.exports = {
  addQuote,
  getQuotes,
  getQuoteQuery,
  deleteQuote,
};

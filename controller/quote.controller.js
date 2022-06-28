"use strict";

const NotFound = require("../utils/handleNotFound");
const BadRequest = require("../utils/handleBadRequest");
const QuotesModel = require("../models/quotes.model");
const NotAccept = require("../utils/handleNotAccept");
const Random = require("../utils/random");
const fs = require("fs");
const path = require("path");

const uploadUrl = path.join(__dirname, "../upload/myFile.json");
let myFile = require("../upload/myFile.json");

const saveFile = () => {
  fs.writeFile(
    "./upload/myFile.json",
    JSON.stringify(myFile, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

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
 * Render home choose file and upload to server.
 * @param {*} _req
 * @param {*} res
 */
const addPage = (_req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(404).send(error.message || error);
  }
};

/**
 * redirect to the quotes page
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const pushJson = (req, res, next) => {
  try {
    fs.readFile(uploadUrl, (error, data) => {
      if (error) throw error;
      let quotes = JSON.parse(data);
      return res.render("quotes", {
        data: quotes,
        message: "OK",
      });
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

/**
 * render add quote page
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addJson = async (req, res) => {
  try {
    let body = req.body;
    if (!body) return res.send(NotFound());
    // Check data already exist
    const check = await QuotesModel.find({
      quote: { $eq: body.quote.toString() },
    });
    if (check[0])
      return res.render("quotes", {
        data: quotes,
        message: "Quote already exists",
        status: 200,
      });

    await new QuotesModel({
      quote: body.quote,
      author: body.author || "Unknown",
      tags: body.tags,
      length: body.quote.length || "Unknown",
      language: body.language || "Unknown",
    }).save();

    myFile = myFile.filter((data) => data.quote != body.quote);
    saveFile();

    fs.readFile(uploadUrl, (error, data) => {
      if (error) throw error;
      let quotes = JSON.parse(data);
      return res.render("quotes", {
        data: quotes,
        message: "OK",
      });
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  addQuote,
  getQuotes,
  getQuoteQuery,
  addPage,
  pushJson,
  addJson,
};

"use strict";

const handleBadRequest = require("../utils/handleBadRequest");
const fs = require("fs");
const path = require("path");
const marked = require("marked");

const home = (req, res) => {
  try {
    const file = path.join(__dirname, "..", "README.md");

    fs.readFile(file, "utf-8", (error, data) => {
      if (error) {
        return res.status(400).send(error);
      }
      res.send(marked(data.toString()));
    });
  } catch (error) {
    return handleBadRequest();
  }
};

module.exports = home;

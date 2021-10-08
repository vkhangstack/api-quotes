"use strict";
const Error = require("http-errors");

module.exports = function NotFound(error) {
  return Error(404, "Invalid input");
};

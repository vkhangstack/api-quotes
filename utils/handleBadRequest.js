"use strict";

const Error = require("http-errors");

module.exports = function BadRequest(error) {
  if (error) {
    return Error(404, "Please try again check API");
  } else {
    return Error(500);
  }
};

"use strict";
const Error = require("http-errors");

module.exports = function NotAccept(error) {
  return Error(406, "Request not Acceptable");
};

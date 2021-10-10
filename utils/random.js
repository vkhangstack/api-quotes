"use strict";
const crypto = require("crypto");

module.exports = function random() {
  return crypto.randomInt(0, 100) / 100;
};

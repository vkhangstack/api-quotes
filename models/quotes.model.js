"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  }
}, {
  timestamps: true,
}, );

module.exports = mongoose.model("quote", quoteSchema);
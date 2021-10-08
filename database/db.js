"use strict";

const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.DB_URL, connectionParams);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Could not connect to MongoDB");
  }
};

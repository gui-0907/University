"use strict";

const mongoose = require("mongoose");

const dbURI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/universidades";

mongoose.connect(dbURI);

module.exports = mongoose;

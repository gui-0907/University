const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: String,
  country: String,
  alpha_two_code: String,
  domains: String,
  web_pages: String,
});

module.exports = mongoose.model("University", universitySchema);

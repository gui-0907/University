"use strict";

const axios = require("axios");
const University = require("./model/University");
const express = require("express");
const routes = express.Router();
const app = express();
const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/universidades";

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.post("/", async (req, res) => {
  try {
    let listCountry = [
      "argentina",
      "brazil",
      "chile",
      "colombia",
      "paraguay",
      "peru",
      "suriname",
      "uruguay",
    ];

    for (let thisCountry of listCountry) {
      let requestUrl = `http://universities.hipolabs.com/search?country=${thisCountry}`;

      let universities = await axios.get(requestUrl);

      for (let university of universities) {
        const jsonUnivesity = {
          country: thisCountry,
          university: university.name,
        };

        await University.create(jsonUnivesity);

        console.log(`Universidade ${university.name} salva no banco`);
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Erro ao buscar as universidades do país ${country}` });
  }
});

module.exports = routes;

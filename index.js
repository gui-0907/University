"use strict";

const axios = require("axios");
const University = require("./model/University");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/universidades";

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.listen(3000);
  })
  .catch((err) =>
    console.log(`falha ao se conectar com o banco, erro: ${err}`)
  );

async function main() {
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

      for (let university of universities.data) {
        let name = university.name;
        let alpha_two_code = university.alpha_two_code;
        let domains = university.domains[0];
        let web_pages = university.web_pages[0];

        const jsonUnivesity = {
          name: name,
          country: thisCountry,
          alpha_two_code: alpha_two_code,
          domains: domains,
          web_pages: web_pages,
        };

        try {
          await University.create(jsonUnivesity);
        } catch (error) {
          console.log(`falha ao salvar universidade no banco, erro: ${error}`);
        }

        console.log(`Universidade ${university.name} salva no banco`);
      }
    }
  } catch (error) {
    throw error;
  }
}

main();

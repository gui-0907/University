"use strict";

const Request = require("request-promise");

const Api = () => {};

Api.call = async (url, method) => {
  let requestParams = {
    url: url,
    method: method,
  };

  try {
    return await Request(requestParams);
  } catch (error) {
    throw error;
  }
};

module.exports = Api;

"use strict";
const dynamoose = require("dynamoose");

const peopleSchecma = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

module.exports = dynamoose.model("people", peopleSchecma);
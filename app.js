require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world how you doing");
});

app.get("/name", (req, res) => {
  res.send("my name is siddhartha");
});

module.exports = app;

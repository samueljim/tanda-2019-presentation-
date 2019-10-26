const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("*", (req, res) => {
  console.log(req.body);
  const error = false;
  if (error) {
    return res.status(500).send(error);
  }
  return res.status(200).send("Cool that worked");
});

app.get("*", (req, res) => {
  res.status(200).send("You are meant to send a post request Moira");
});

module.exports = app;

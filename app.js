const express = require("express");
const app = express();

const port = 3000;
// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world how you doing");
});

app.get("/name", (req, res) => {
  res.send("my name is siddhartha");
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

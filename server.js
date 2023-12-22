const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const DB_NAME = require("./constants");

dotenv.config({ path: "./config.env" });

//!DATABASE CONNECTED
const DB = `${process.env.DATABASE}/${DB_NAME}`;
mongoose.connect(DB, {}).then(() => console.log("DB connected Successfully"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

const fs = require("fs");
const DB_NAME = require("./../../constants");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const Quotes = require("./../../Models/quotesModel");

const DB = `${process.env.DATABASE}/${DB_NAME}`;
mongoose.connect(DB, {}).then(() => console.log("DB connected Successfully"));

const quotes = JSON.parse(fs.readFileSync(`${__dirname}/quotes.json`, "utf-8"));

const importData = async () => {
  try {
    await Quotes.create(quotes, { validateBeforeSave: false });
    console.log("Data loaded sucessfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Quotes.deleteMany();
    console.log("Data deleted sucessfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const DB_NAME = require("./constants");
// const express = require("express");

dotenv.config({ path: "./config.env" });

const DB = `${process.env.DATABASE}/${DB_NAME}`;
console.log("Before DB connection");
mongoose.connect(DB, {}).then(() => console.log("DB connected Successfully"));

const port = process.env.PORT || 5000;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An user must have a name"],
      trim: true,
      maxlength: [40, "A name must be less or equal to 40 character"],
    },

    email: {
      type: String,
      required: [true, "An User must have email"],
    },
  }
  // { timestamps: true } //created at and updated at dinxa
);
const User = mongoose.model("User", UserSchema);

const testUser = new User({
  name: "Siddhartha",
  email: "sidedunp@gmail.com",
});

testUser
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

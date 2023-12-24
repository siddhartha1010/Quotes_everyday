const mongoose = require("mongoose");
const slugify = require("slugify");

const quotesSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: [true],
      unique: true,
    },
    slug: String,
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //created at and updated at dinxa
);

const Quote = mongoose.model("Quote", quotesSchema);

module.exports = Quote;

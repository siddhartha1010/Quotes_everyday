const Quote = require("./../Models/quotesModel");
const catchasync = require("./../utils/catchasync");
const AppError = require("../utils/appError");
const { findOne } = require("../Models/userModel");
const sendEmail = require("./../utils/email");
// const User = require("./../Models/userModel");

exports.getAllQuotes = catchasync(async (req, res) => {
  const quotes = await Quote.find();
  res.status(200).json({
    status: "success",
    results: quotes.length,
    data: {
      quotes,
    },
  });
});

exports.getAQuotes = catchasync(async (req, res) => {
  const quotes = await Quote.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      quotes,
    },
  });
});

exports.deleteQuote = catchasync(async (req, res, next) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);
  if (!quote) {
    next(new AppError("No quote with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});

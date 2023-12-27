const Quote = require("./../Models/quotesModel");
const catchasync = require("./../utils/catchasync");
const AppError = require("../utils/appError");

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

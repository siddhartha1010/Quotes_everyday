const { json } = require("express");
const User = require("./../Models/userModel");
const catchasync = require("./../utils/catchasync");
const AppError = require("../utils/appError");
const Quote = require("./../Models/quotesModel");
const sendEmail = require("./../utils/email");
const cron = require("node-cron");

exports.getAllUsers = catchasync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getOneUser = catchasync(async (req, res, next) => {
  // console.log(req.params);
  const idno = req.params.id;
  // console.log(idn);

  const OneUser = await User.findById(idno);

  if (!OneUser) {
    return next(new AppError(`No User with such id found`, 404)); //Yo line execute vayesi ya bata tala janu hunna so yei bata return garnu paryo
  }
  res.status(200).json({
    status: "success",
    data: {
      OneUser,
    },
  });
});

exports.deleteMe = catchasync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false }); //already logged in ko id
  // console.log(finduser);
  // if (!finduser) {
  //   return next(new AppError("User not found", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.sendQuotes = async (req, res, next) => {
  try {
    let lastSentQuoteId = null;

    // Function to send a random quote
    const sendRandomQuote = async () => {
      try {
        // Build the aggregation pipeline to exclude the last sent quote
        const aggregationPipeline = [
          { $match: { _id: { $ne: lastSentQuoteId }, active: true } },
          { $sample: { size: 1 } },
        ];

        const randomQuote = await Quote.aggregate(aggregationPipeline);

        if (!randomQuote || randomQuote.length === 0) {
          console.error("No quotes found in the database");
          return;
        }

        // Update the lastSentQuoteId for the next iteration
        lastSentQuoteId = randomQuote[0]._id;

        const quoteText = randomQuote[0].quote; // Assuming 'quote' is the property containing the quote text

        await sendEmail({
          email: req.user.email,
          subject: "Quotes every day",
          message: quoteText,
        });

        // console.log("Quote has been sent to your email");
      } catch (error) {
        console.error(error);
      }
    };

    // Schedule the task to run every minute
    cron.schedule("* * * * *", () => {
      sendRandomQuote();
    });

    // Initial execution
    sendRandomQuote();

    res.status(200).json({
      status: "success",
      message: "Quote sending task scheduled",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const { json } = require("express");
const User = require("./../Models/userModel");
const catchasync = require("./../utils/catchasync");
const AppError = require("../utils/appError");

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

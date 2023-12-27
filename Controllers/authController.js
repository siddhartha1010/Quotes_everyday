const User = require("./../Models/userModel");
const catchasync = require("./../utils/catchasync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { decode } = require("punycode");

const sendToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.signup = catchasync(async (req, res) => {
  const newUser = await User.create(req.body);

  const token = sendToken(newUser._id);
  //   console.log(token);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchasync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exist or not
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  //   console.log(user);

  //   const correct=user.correctPassword(password,user.password);
  console.log(user._id);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or passowrd", 401));
  }

  //If everything is ok ,send token to the client
  const token = sendToken(user._id);
  //   console.log(token);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchasync(async (req, res, next) => {
  let token;
  //Getting token and checking it's there or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log(req.headers);

  // console.log(token);

  if (!token) {
    next(new AppError("You are not logged on please log in.", 401));
  }
  //!ya samma le chai jun token paye ni on the basis of the id result dinxa
  //token manipulate vaye ki expire vayo?verify

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //!yesle token correct xa ki nai herxa
  // console.log("tt", decoded);
  //!ya samma chai token correct xaki nai herxa

  //USer exist gardaina ani user le token payesi passeord change garyo
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError("Token belolnging to the user no longer exist", 401)
    );
  }

  //user le password change garryo token payesi
  if (freshUser.changedPasswordAfterReceivingtoken(decoded.iat)) {
    next(
      new AppError("Your password was recently changed.Please login again", 401)
    );
  }
  req.user = freshUser;
  next();
});

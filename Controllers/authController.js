const User = require("./../Models/userModel");
const catchasync = require("./../utils/catchasync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { decode } = require("punycode");
const crypto = require("crypto");
const Email = require("./../utils/email");
const { isUint8ClampedArray } = require("util/types");

const sendToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = sendToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_COOKIE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchasync(async (req, res) => {
  const newUser = await User.create(req.body);
  // const url = `${req.protocol}://${req.get("host")}`;
  const url = `http://127.0.0.1:4000/api/v1/users/signup`;
  // console.log(url);
  await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, res);
});

exports.login = catchasync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exist or not
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  // console.log(user);

  //   const correct=user.correctPassword(password,user.password);
  // console.log(user._id);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or passowrd", 401));
  }

  //If everything is ok ,send token to the client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchasync(async (req, res, next) => {
  let token;
  //Getting token and checking it's there or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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
  const CurrentUser = await User.findById(decoded.id);

  if (!CurrentUser) {
    return next(
      new AppError("Token belolnging to the user no longer exist", 401)
    );
  }

  //user le password change garryo token payesi
  if (CurrentUser.changedPasswordAfterReceivingtoken(decoded.iat)) {
    next(
      new AppError("Your password was recently changed.Please login again", 401)
    );
  }
  req.user = CurrentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const CurrentUser = await User.findById(decoded.id);

      if (!CurrentUser) {
        return next();
      }

      if (CurrentUser.changedPasswordAfterReceivingtoken(decoded.iat)) {
        return next();
      }

      res.locals.user = CurrentUser;
      console.log(res.locals.user);

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles:admin,user
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 404)
      );
    }
    next();
  };
};

exports.forgotPassword = catchasync(async (req, res, next) => {
  //Get user based ron posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("please provide correct password and email", 404));
  }
  //Generate the random reset token
  const resetToken = user.createPasswrodResetToken();
  await user.save({ validateBeforeSave: false });

  //Send email to user

  // console.log(restURL);

  // const message = `Forget password?Submit patch request to ${restURL}`;
  //generally yo case ma we could use catchasync tara yesma error mattra patahaye pugdaina so
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    // await sendEmail({
    //   email: req.body.email,
    //   subject: "Passwrod reset token",
    //   message,
    // });
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token has been sent",
    });
  } catch (err) {
    (user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined),
      await user.save({ validateBeforeSave: false });

    return next(new AppError("Error sending email", 500));
  }
});

exports.resetPassword = catchasync(async (req, res, next) => {
  //Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  });

  //If token has not expired and there is user set the password
  if (!user) {
    return next(new AppError("Token is not valid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //Update changedPasswordAt proprty for the user

  //Log the user in,send JWT
  createSendToken(user, 200, res);
});

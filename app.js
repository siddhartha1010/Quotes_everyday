const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userRouter = require("./routes/userroutes");
const AppError = require("./utils/appError");
const globalError = require("./Controllers/errorController");

dotenv.config({ path: "./config.env" });
app.use(express.json());
//!ROUTES

app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //whatever we pass into next will gonna be error //new keyword when creating instances of your class.
});

app.use(globalError);

module.exports = app;

const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userRouter = require("./routes/userroutes");
const quoteRouter = require("./routes/quoteroutes");

const AppError = require("./utils/appError");
const globalError = require("./Controllers/errorController");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });

//!MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

//!ROUTES

app.use("/api/v1/users", userRouter);
app.use("/api/v1/quotes", quoteRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //whatever we pass into next will gonna be error //new keyword when creating instances of your class.
});

app.use(globalError);

module.exports = app;

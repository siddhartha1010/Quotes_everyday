const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const userRouter = require("./routes/userroutes");
const quoteRouter = require("./routes/quoteroutes");
const viewRouter = require("./routes/viewroutes");

const helmet = require("helmet");
const AppError = require("./utils/appError");
const globalError = require("./Controllers/errorController");
const morgan = require("morgan");
const xss = require("xss");
const mongosanitize = require("mongo-sanitize");
const cookieParser = require("cookie-parser");
const pug = require("pug");
dotenv.config({ path: "./config.env" });

const app = express();

//For pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//1Global Middlewares
//Serving static files
app.use(express.static(path.join(__dirname, "public")));

//
// app.use(helmet());
// // app.use(xss());
// app.use(mongosanitize());
// app.use(cookieParser());
//!MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));

//!ROUTES
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/quotes", quoteRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //whatever we pass into next will gonna be error //new keyword when creating instances of your class.
});

app.use(globalError);

module.exports = app;

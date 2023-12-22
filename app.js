const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userRouter = require("./routes/userroutes");

dotenv.config({ path: "./config.env" });

//!ROUTES
app.use("/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't fin ${req.originalUrl} on the server`,
  });
});

module.exports = app;

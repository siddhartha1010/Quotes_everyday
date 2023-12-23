const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const DB_NAME = require("./constants");

dotenv.config({ path: "./config.env" });

//!Catching uncaught exceptions like console.log(x) but x is not defined yo synchronous tala ko i guess async
process.on("uncaughtException", (err) => {
  console.log("Uncaught execption shuutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

//!DATABASE CONNECTED
const DB = `${process.env.DATABASE}/${DB_NAME}`;
mongoose.connect(DB, {}).then(() => console.log("DB connected Successfully")); //In summary, the order of log messages depends on the execution time of asynchronous operations. Both operations (database connection and server listening) happen concurrently, and the order of their completion determines the order of the log message

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at ${port}`); //In summary, the order of log messages depends on the execution time of asynchronous operations. Both operations (database connection and server listening) happen concurrently, and the order of their completion determines the order of the log message
});
//In server.js, when you call app.listen(port, ...) to start the server, it will listen for incoming requests and automatically run through the middleware stack for each request.
//Each middleware function specified with app.use() or app.all() will be executed in the order in which they are defined. The request will pass through each middleware function, and each function has the opportunity to modify the request or response or perform other actions before passing control to the next middleware or route handler.
//!Handling uncaught erroer like db not connected and all DB DOWN FOR SOME REASON
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION Shutting Down");
  server.close(() => {
    //!SERVER.CLOSE LE ABBORTLY DIRECTLY CLOSE GARDAINA BISTARI GARXA.GOOD PRATICE TO USE
    process.exit(1);
  });
});

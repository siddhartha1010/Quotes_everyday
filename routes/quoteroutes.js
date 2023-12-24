const express = require("express");
const quoteController = require("./../Controllers/quoteController");

const router = express.Router();

router.get("/getallquotes", quoteController.getAllQuotes);
// router.post("/createuser", userController.createUser);
// router.get("/getauser/:id", userController.getOneUser);
module.exports = router;

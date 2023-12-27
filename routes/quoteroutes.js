const express = require("express");
const quoteController = require("./../Controllers/quoteController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router.get("/getallquotes", quoteController.getAllQuotes);
// router.post("/createuser", userController.createUser);
router.get(
  "/getaquote/:id",
  authController.protect,
  quoteController.getAQuotes
);
module.exports = router;

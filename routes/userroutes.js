const express = require("express");
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/getallusers", userController.getAllUsers);
// router.post("/createuser", userController.createUser);
router.get("/getauser/:id", userController.getOneUser);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.delete("/deleteuser", authController.protect, userController.deleteMe);

router.get("/onequote", authController.protect, userController.sendQuotes);

module.exports = router;

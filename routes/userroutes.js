const express = require("express");
const userController = require("./../Controllers/userController");

const router = express.Router();

router.get("/getallusers", userController.getAllUsers);
router.post("/createuser", userController.createUser);
module.exports = router;

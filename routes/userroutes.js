const express = require("express");
const userController = require("./../Controllers/userController");

const router = express.Router();

router.get("/getallusers", userController.getAllUsers);
router.post("/createuser", userController.createUser);
router.get("/getauser/:id", userController.getOneUser);
module.exports = router;

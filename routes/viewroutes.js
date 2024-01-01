const express = require("express");
const viewsController = require("./../Controllers/viewsController");
const router = express.Router();
const authController = require("./../Controllers/authController");

router.use(authController.isLoggedIn);

router.get("/", viewsController.main),
  router.get("/_overview", viewsController.getOverview);

router.get("/register", viewsController.register);

module.exports = router;

const express = require("express");
const viewsController = require("./../Controllers/viewsController");
const router = express.Router();

router.get("/", viewsController.main),
  router.get("/overview", viewsController.getOverview);
router.get("/register", viewsController.register);

module.exports = router;

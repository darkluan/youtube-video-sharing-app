const express = require("express");
const authenticate = require("app/middleware/authenticate.middleware");
const validator = require("app/middleware/validator.middleware");
const { register } = require("./validator");
const controller = require("./user.controller");
const router = express.Router();

router.post("/register", validator(register), controller.register);
router.get("/info", authenticate, controller.getUserInfo);
router.post("/shared-video", authenticate, controller.shareVideo);

module.exports = router;

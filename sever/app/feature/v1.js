const express = require("express");
const router = express.Router();
router.use("/authentication", require("./authentication/authentication.route"));
router.use("/users", require("./user/user.route"));

module.exports = router;

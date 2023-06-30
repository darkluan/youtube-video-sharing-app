const express = require("express");
const controller = require("./shared.controller");
const router = express.Router();

router.get("/videos", controller.getYoutubeVideos);

module.exports = router;

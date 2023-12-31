const logger = require("app/lib/logger");
const { createPasswordHash } = require("app/lib/crypto");
const User = require("app/model/index").users;
const UserShare = require("app/model/index").user_shareds;

module.exports = {
  getUserInfo: async (req, res, next) => {
    const userId = req.user.id;
    try {
      const user = await User.findOne({
        attributes: ["id", "email"],
        where: {
          id: userId,
        },
      });

      return res.ok(user);
    } catch (error) {
      logger.error("USER::USER INFO", error);
      next(error);
    }
  },
  register: async (req, res, next) => {
    let { email, password } = req.body;
    try {
      let user = await User.findOne({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (user) {
        return res.badRequest(res.__("USER_IS_EXIST"), "USER_IS_EXIST");
      }

      const { salt, hash } = createPasswordHash(password);
      user = await User.create({
        email: email.toLowerCase(),
        password: hash,
        salt,
      });

      return res.ok(true);
    } catch (error) {
      logger.error("USER::REGISTER", error);
      next(error);
    }
  },
  shareVideo: async (req, res, next) => {
    const userId = req.user.id;
    try {
      let user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.badRequest(res.__("USER_NOT_FOUND"), "USER_NOT_FOUND");
      }

      let checkYoutubeId = await UserShare.findOne({
        where: {
          youtube_id: req.body.youtube_id,
        },
      });
      if (checkYoutubeId) {
        return res.badRequest(res.__("VIDEO_IS_EXIST"), "VIDEO_IS_EXIST");
      }

      await UserShare.create({
        user_id: userId,
        youtube_id: req.body.youtube_id,
      });
      // broadcast message
      global.socketServer.emitMessage(
        JSON.stringify({
          sharedBy: user.email,
          youtube_id: req.body.youtube_id,
        })
      );
      return res.ok(true);
    } catch (error) {
      logger.error("USER::REGISTER", error);
      next(error);
    }
  },
};
